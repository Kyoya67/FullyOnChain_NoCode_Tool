// src/components/HomePage.js
import React from 'react';
import { useNavigate } from 'react-router-dom'; // useNavigateをインポート
import styles from './css/HomePage.module.css'; // 適切なパスに修正してください。

const HomePage = () => {
  const navigate = useNavigate();

  // CollectionListページに移動する関数
  const goToCollectionList = () => {
    navigate('/collections'); // '/collections'はCollectionListが表示されるパスに合わせてください
  };

  return (
    <div className={styles.container} style={{background: "#C4FFF9"}}>
      <h1>Welcome to the NFT Collection Factory</h1>
      <p>Create and manage your own NFT collections fully on-chain.</p>
      <button onClick={goToCollectionList} className={styles.button}>
        Create Original NFT
      </button>
      {/* その他のコンテンツ */}
    </div>
  );
};

export default HomePage;
