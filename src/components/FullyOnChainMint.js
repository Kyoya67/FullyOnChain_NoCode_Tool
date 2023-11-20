import React, { useEffect, useState } from 'react';
import { useWallet } from '../contexts/WalletContext';
import { useParams, useLocation } from 'react-router-dom';
import { ethers } from 'ethers';
import mintAbi from './abi/mint.json';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import styles from './css/SvgMint.module.css'

// SVG NFTコントラクトのABIを設定します。
const FullyOnChainMint = () => {
  const { userAddress, connectWallet } = useWallet();
  const [contractAddress, setContractAddress] = useState('');
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [workData, setWorkData] = useState('');
  const [fileType, setFileType] = useState('')
  const { address } = useParams();
  const location = useLocation();

  // HTMLエディタの内容を保持するステートを追加
  const [htmlContent, setHtmlContent] = useState('');

  useEffect(() => {
    if (address) {
      setContractAddress(address);
    }
    // locationからfileTypeを取得してステートを設定
    const stateFileType = location.state?.fileType;
    // console.log('File type from location state:', stateFileType);
    if (stateFileType) {
      setFileType(stateFileType);
    }
  }, [address, location]);


  const mintNFT = async () => {
    if (!userAddress) {
      // ユーザーにウォレット接続を要求する
      await connectWallet();
    }

    // ウォレット接続後の処理
    if (userAddress) {
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();


      try {
        // Ethers.jsを使用してコントラクトに接続します。
        const mintContract = new ethers.Contract(contractAddress, mintAbi, signer);
        // コントラクトのnftMint関数を呼び出します。
        const transaction = await mintContract.nftMint(title, description, workData);
        // トランザクションがマイニングされるまで待ちます。
        await transaction.wait();
        console.log(`NFT minted: ${transaction.hash}`);
      } catch (error) {
        console.error('Error minting NFT:', error);
      }
    }
  };

  // react-quillのonChangeイベントハンドラ
  const handleHtmlContentChange = (content) => {
    setHtmlContent(content);
  };

  return (
    <div className={styles.appBackground}>
      <div className={styles.container}>
      <h1>
        {fileType === 'HTML' && (
          <ReactQuill
            theme="snow"
            value={htmlContent}
            onChange={handleHtmlContentChange}
          />
        )}
      </h1>
      <div className={styles.container} style={{ marginTop: 200 }}>
        <span>File Type: {fileType}</span>
        <span>{contractAddress}</span>
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

        <input
          className={styles.input}
          value={workData}
          onChange={(e) => setWorkData(e.target.value)}
          placeholder="Base64 Encoded"
        />
        <button
          className={styles.button}
          onClick={mintNFT}
        >
          Mint NFT
        </button>
      </div>
    </div>
    </div>
  );
};

export default FullyOnChainMint;
