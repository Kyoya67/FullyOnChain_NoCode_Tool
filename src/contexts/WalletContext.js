import React, { createContext, useContext, useState } from 'react';
import { ethers } from 'ethers'; // ethersライブラリをインポート

const WalletContext = createContext(null);

export const useWallet = () => useContext(WalletContext);

export const WalletProvider = ({ children }) => {
  const [userAddress, setUserAddress] = useState('');

  // メタマスクと接続する関数
  const connectWallet = async () => {
    if (window.ethereum) {
      try {
        const provider = new ethers.providers.Web3Provider(window.ethereum);
        const accounts = await provider.send("eth_requestAccounts", []);
        setUserAddress(accounts[0]);
      } catch (error) {
        console.error('Error connecting to MetaMask', error);
      }
    } else {
      alert('Please install MetaMask.');
    }
  };

  return (
    <WalletContext.Provider value={{ userAddress, connectWallet }}>
      {children}
    </WalletContext.Provider>
  );
};
