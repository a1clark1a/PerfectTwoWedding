import React from "react";
import Popup from "reactjs-popup";

import "./Loading.styles.scss";
import plains from "../../images/mtgmana-01.png";
import island from "../../images/mtgmana-02.png";
import swamp from "../../images/mtgmana-03.png";
import mountain from "../../images/mtgmana-04.png";
import forest from "../../images/mtgmana-05.png";

const Loading = ({ loading }: { loading: boolean }): React.JSX.Element => {
  return (
    <>
      <Popup
        open={loading}
        closeOnDocumentClick={false}
        className="loadingPopup"
      >
        <div className="loader">
          <div className="loader__circle">
            <img src={plains} className="loadingImg" alt="plains" />
          </div>
          <div className="loader__circle">
            <img src={island} className="loadingImg" alt="island" />
          </div>
          <div className="loader__circle">
            <img src={swamp} className="loadingImg" alt="swamp" />
          </div>
          <div className="loader__circle">
            <img src={mountain} className="loadingImg" alt="mountain" />
          </div>
          <div className="loader__circle">
            <img src={forest} className="loadingImg" alt="forest" />
          </div>
        </div>
      </Popup>
    </>
  );
};

export default Loading;
