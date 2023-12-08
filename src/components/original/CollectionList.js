import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useWallet } from '../../contexts/WalletContext';
import { ethers } from 'ethers';
import factoryAbi from './abi/factory.json';
import mintAbi from './abi/mint.json';
import styles from './css/CollectionList.module.css';

const factoryAddress = '0x3E1C92a4FD855c375413672a1d71a1278e759888';

const CollectionList = () => {
  const { userAddress, connectWallet } = useWallet();
  const [collections, setCollections] = useState([]);
  const navigate = useNavigate();

  const addNewCollection = () => {
    navigate('/new-collection');
  };

  const handleCollectionClick = (collection) => {
    navigate(`/mint/${collection.address}`, { state: { name: collection.name, fileType: collection.fileType } });
  };

  const getCreatedContracts = async () => {
    if (userAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      console.log(provider);
      const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, provider);
      try {
        const filter = factoryContract.filters.NFTContractCreated(userAddress);
        const events = await factoryContract.queryFilter(filter, 4831470);
        const contractDetails = await Promise.all(events.map(async (event) => {
          const contract = new ethers.Contract(event.args.contractAddress, mintAbi, provider);
          const name = await contract.name();
          const symbol = await contract.symbol();
          const fileType = await contract.getFileType();
          return {
            address: event.args.contractAddress,
            name: name,
            symbol: symbol,
            fileType: fileType
          };
        }));
        setCollections(contractDetails);
        // console.log(contractDetails);
      } catch (error) {
        console.error('Error fetching created contracts:', error);
      }
    }
  };

  useEffect(() => {
    if (!userAddress) {
      connectWallet();
    } else {
      getCreatedContracts();
    }
  }, [userAddress, connectWallet]);

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>My Collections</h1>
      <button onClick={addNewCollection} className={styles.addButton}>
        Create Collection
      </button>
      <ul className={styles.list}>
        {collections.map((collection, index) => (
          <li key={index} className={styles.item} onClick={() => handleCollectionClick(collection)}>
            <span className={styles.details} style={{ marginRight: 10 }}>Name: {collection.name}</span>
            <span className={styles.details} style={{ marginRight: 10 }}>Symbol: {collection.symbol}</span>
            <span className={styles.details}>File Type: {collection.fileType}</span>
            <div className={styles.address}>{collection.address}</div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CollectionList;
