import React, { useState, useEffect } from 'react';
import { ethers } from 'ethers';
import { useWallet } from '../../contexts/WalletContext'; // WalletContextからuseWalletをインポート
import factoryAbi from './abi/factory.json';
import styles from './css/Factory.module.css';

// ファクトリー・コントラクトのABIとアドレスを設定します。
// ABIはコントラクトのコンパイル時に生成されたものを使用してください。
const factoryAddress = '0x3E1C92a4FD855c375413672a1d71a1278e759888'; // ファクトリー・コントラクトのアドレスをここに置きます。

const Factory = () => {
    const { userAddress, connectWallet } = useWallet(); // グローバルウォレット状態を取得
    const [name, setName] = useState('');
    const [symbol, setSymbol] = useState('');
    const [fileType, setFileType] = useState('SVG');
    const [contractAddress, setContractAddress] = useState('');

    useEffect(() => {
        if (!userAddress) {
            connectWallet();
        }
    }, [userAddress, connectWallet]);

    const createNFTContract = async () => {
        if (!userAddress) {
            // ユーザーにウォレット接続を要求する
            await connectWallet();
        }

        // ウォレット接続後の処理
        if (userAddress) {
            const provider = new ethers.providers.Web3Provider(window.ethereum);
            const signer = provider.getSigner();

            try {
                const factoryContract = new ethers.Contract(factoryAddress, factoryAbi, signer);
                const transaction = await factoryContract.createNFTContract(name, symbol, fileType);
                const tx = await transaction.wait();
                const newContractEvent = tx.events.find((e) => e.event === 'NFTContractCreated');
                const newContractAddress = newContractEvent ? newContractEvent.args.contractAddress : null;

                if (newContractAddress) {
                    setContractAddress(newContractAddress);
                } else {
                    console.error('No NFTContractCreated event found');
                }
            } catch (error) {
                console.error('Error creating new NFT contract:', error);
            }
        }
    };

    return (
        <div className={styles.container}>
            <input
                className={styles.input}
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="NFT Collection Name"
            />
            <input
                className={styles.input}
                value={symbol}
                onChange={(e) => setSymbol(e.target.value)}
                placeholder="NFT Symbol"
            />
            <div>
                <input
                    type="radio"
                    id="svg"
                    name="fileType"
                    value="SVG"
                    checked={fileType === 'SVG'}
                    onChange={(e) => setFileType(e.target.value)}
                />
                <label htmlFor="svg">SVG</label>

                <input
                    type="radio"
                    id="html"
                    name="fileType"
                    value="HTML"
                    checked={fileType === 'HTML'}
                    onChange={(e) => setFileType(e.target.value)}
                />
                <label htmlFor="html">HTML</label>
            </div>
            <button
                className={styles.button}
                onClick={createNFTContract}
            >
                Create NFT Contract
            </button>
            {contractAddress && (
                <p className={styles.address}>New Contract Address: {contractAddress}</p>
            )}
        </div>
    );
};

export default Factory;


