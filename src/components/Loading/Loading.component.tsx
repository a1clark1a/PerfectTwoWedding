import React from "react";
import Popup from "reactjs-popup";

import "./Loading.styles.scss";

const Loading = ({ loading }: { loading: boolean }): React.JSX.Element => {
  return (
    <>
      <Popup
        open={loading}
        closeOnDocumentClick={false}
        className="loadingPopup"
      >
        <div className="loader">
          <div className="loader__circle"></div>
          <div className="loader__circle"></div>
          <div className="loader__circle"></div>
          <div className="loader__circle"></div>
          <div className="loader__circle"></div>
        </div>
      </Popup>
    </>
  );
};

export default Loading;
