import { useState } from 'react';
import React from 'react';
import MintNFT from './MintNFT'; // MintNFTコンポーネントをインポート
import SelectColor from './SelectColor';
import styles from "../css/TripleHelix.module.css";

function TripleHelix() {
  const [colors, setColors] = useState({
    hue1: 0,
    hue2: 0,
    hue3: 0,
  });

  // 更新関数を一つにまとめる
  const updateColor = (colorName, value) => {
    setColors((prevColors) => ({
      ...prevColors,
      [colorName]: value,
    }));
  };

  return (
    <div className="App">
      <h1 style={{color:"#fff", textAlign: "center", fontSize: "60px", margin: "0"}}>TripleHelix</h1>
      <SelectColor styles={styles} colors={colors} setColors={updateColor}/>
      <MintNFT styles={styles} colors={colors}/>
    </div>
  );
}

export default TripleHelix;
