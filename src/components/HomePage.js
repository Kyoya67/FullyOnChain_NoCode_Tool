import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './HomePage.module.css';

const HomePage = () => {
  const navigate = useNavigate();

  const goToCollectionList = () => {
    navigate('/collections');
  };

  const goToReadyMadeNFT = () => {
    navigate('/worklist');
  };

  return (
    <>
      <div className={styles.content}>
        <h1>The No-Code Fully On Chain <br/>NFT Platform</h1>
        <p>You can choose to make an original NFT or a ready-made NFT</p>
      </div>
      <div className={styles.buttonsContainer}>
        <button onClick={goToCollectionList} className={styles.original_button}>
          Create Original NFT
        </button>

        <button onClick={goToReadyMadeNFT} className={styles.readyMade_button}>
          Create ReadyMade NFT
        </button>
      </div>
    </>
  );
};

export default HomePage;
