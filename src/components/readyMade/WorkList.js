import React from "react";
import { Link } from "react-router-dom";
import "./css/WorkList.css"; // CSSファイルをインポート
import TripleHelix from "./image/TripleHelix.png";
import NoiseWave from "./image/NoiseWave.png";
import Fantasia from "./image/Fantasia.png";

const WorkList = () => {
    return (
        <>
            <h1 style={{ textAlign: "center", color: "white", fontSize: "60px" }}>ReadyMade NFT List </h1>
            <div className="workListContainer">
                <Link to="/tripleHelix">
                    <div className="workListTitle">
                        <img src={TripleHelix} alt="TripleHelix" className="workListImage" />
                        <div>TripleHelix</div>
                    </div>
                </Link>
                <div className="workListTitle">
                    <img src={NoiseWave} alt="NoiseWave" className="workListImage" />
                    <div>NoiseWave</div>
                </div>
                <div className="workListTitle">
                    <img src={Fantasia} alt="Fantasia" className="workListImage" />
                    <div>Fantasia</div>
                </div>
            </div>
        </>
    );
}

export default WorkList;
