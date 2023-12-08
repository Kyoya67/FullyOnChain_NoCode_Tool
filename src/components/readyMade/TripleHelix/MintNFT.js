import { ethers } from 'ethers';
import contractABI from '../abi/tripleHelix.json';

// スマートコントラクトのABIとアドレスを置き換えてください
const contractAddress = "0x083C3a8e101414882335cF0894BFd05c4Cf7D61B";

// コンポーネント
const MintNFT = ({ styles, colors }) => {

  // NFTをミントする関数
  const mintNFT = async () => {
    // プロバイダーを設定（ここではMetaMaskを使用）
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    // ユーザーにアカウント接続を要求
    await provider.send("eth_requestAccounts", []);
    // サインインしているアカウントを取得
    const signer = provider.getSigner();
    // コントラクトのインスタンスを生成
    const contract = new ethers.Contract(contractAddress, contractABI, signer);

    // nftMint関数を呼び出し
    try {
      const txResponse = await contract.nftMint(colors.hue1, colors.hue2, colors.hue3);
      console.log('Transaction Response:', txResponse);
      // トランザクションがマイニングされるのを待つ
      const receipt = await txResponse.wait();
      console.log('Transaction Receipt:', receipt);
    } catch (error) {
      console.error('Error minting NFT:', error);
    }
  };

  return (
    <div className={styles.container}>
      <button
        className={styles.button}
        onClick={mintNFT}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#AAA')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#fff')}
      >
        Mint NFT
      </button>
      <a
        className={styles.button}
        onMouseOver={(e) => (e.target.style.backgroundColor = '#AAA')}
        onMouseOut={(e) => (e.target.style.backgroundColor = '#fff')}
        href="https://testnets.opensea.io/ja/collection/triplehelix-onchainnft-4"
        target="_blank">
        View Collection on OpenSea
      </a>
    </div>
  );
};

export default MintNFT;
