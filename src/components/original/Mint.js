import React, { useEffect, useState } from 'react';
import { useWallet } from '../../contexts/WalletContext';
import { useParams, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import mintAbi from './abi/mint.json';
import styles from './css/Mint.module.css';
import AceEditor from "react-ace";
import 'ace-builds/webpack-resolver';
import 'ace-builds/src-noconflict/theme-monokai';
import 'ace-builds/src-noconflict/mode-html';
import 'ace-builds/src-noconflict/mode-css';
import 'ace-builds/src-noconflict/mode-javascript';
import "ace-builds/src-noconflict/mode-svg";
import "ace-builds/src-noconflict/theme-github";

//NFTコントラクトのABIを設定します。
const Mint = () => {
  const { userAddress, connectWallet } = useWallet();
  const [contractAddress, setContractAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [workData, setWorkData] = useState('');
  const [fileType, setFileType] = useState('');
  const [collectionName, setCollectionName] = useState('');
  const { address } = useParams();
  const location = useLocation();
  const [editCode, setEditCode] = useState('');
  const [isReadyToMint, setIsReadyToMint] = useState(false);

  useEffect(() =>{
    encodeToBase64(editCode);
  },[editCode]);

  useEffect(() => {
    if (address) {
      setContractAddress(address);
    }

    const state = location.state;
    if (state) {
      if (state.fileType) {
        setFileType(state.fileType);
      }
      if (state.name) {
        setCollectionName(state.name);
      }
    }
  }, [address, location]);

  const encodeToBase64 = (code) => {
    try {
      const encoded = btoa(code);
      setWorkData(encoded);
      console.log(encoded);
    } catch (e) {
      console.error('Encoding to base64 failed:', e);
    }
  };

  useEffect(() => {
    if (editCode) encodeToBase64(editCode);
  }, [editCode]); // Only encode when editCode changes


  const handleCodeChange = (newCode) => {
    setEditCode(newCode);
  };

  const mode = fileType === 'SVG' ? 'svg' : 'html';

  const mintNFT = async () => {
    if (!userAddress) {
      try {
        await connectWallet();
      } catch (error) {
        console.error('Wallet connection failed:', error);
        return; // Exit if wallet connection fails
      }
    }
    setIsReadyToMint(true);
  };

  useEffect(() => {
    if (isReadyToMint && workData) {
      (async () => {
        await handleMinting();
        setIsReadyToMint(false); // Reset the trigger after minting
      })();
    }
  }, [isReadyToMint, workData, userAddress]); // Make sure all dependencies are listed

  const handleMinting = async () => {
    if (userAddress && workData) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      
      try {
        // Connect to the contract and mint the NFT
        const mintContract = new ethers.Contract(contractAddress, mintAbi, signer);
        const transaction = await mintContract.nftMint(title, description, workData);
        await transaction.wait();
        console.log(`NFT minted: ${transaction.hash}`);
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    } else {
      console.error('User address or work data is not set.');
    }
  }

  const aceEditor = (
    <AceEditor
      mode={mode}
      theme="monokai"
      name="code_editor"
      onChange={handleCodeChange}
      fontSize={14}
      showPrintMargin={true}
      showGutter={true}
      highlightActiveLine={true}
      value={editCode}
      setOptions={{
        enableBasicAutocompletion: false,
        enableLiveAutocompletion: false,
        enableSnippets: false,
        showLineNumbers: true,
        tabSize: 2,
      }}
      style={{ width: '100%', height: '100%' }} // This will make Ace Editor fill up the height
    />
  );

  return (
    <>
      <h1 className={styles.info}>Collection Name : {collectionName}</h1>
      <h2 className={styles.info}>
        <div>File Type: {fileType}</div>
        <div style={{ margin: 10 }}>
          Contract Address :
          <a
            href={`https://testnets.opensea.io/ja/assets/sepolia/${contractAddress}/`}
            style={{ color: 'white' }}>
            {"   "}{contractAddress}
          </a>
        </div>
      </h2>

      <div className={styles.layoutContainer}>
        <div className={styles.aceEditorContainer}>
          {(fileType === 'SVG' || fileType === 'HTML') && aceEditor}
        </div>
        <div className={styles.livePreviewContainer}>
          <iframe
            style={{ border: '1px solid #ddd', width: '100%', height: '100%' }}
            srcDoc={editCode}
            title="Live Preview"
          />
        </div>
      </div>

      <div>
        <div className={styles.container} style={{ marginTop: 50 }}>
          <input
            className={styles.input}
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="NFT Title"
          />
          <textarea
            className={`${styles.input} ${styles.textarea}`}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="NFT Description"
          />

          <button
            className={styles.button}
            onClick={mintNFT}
          >
            Mint NFT
          </button>
        </div>
      </div>
    </>
  );
};

export default Mint;