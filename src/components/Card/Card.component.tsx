import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import "./Card.styles.scss";

const Card = ({
  label,
  img,
  children,
  callback,
  popupClassName,
}: {
  label: string;
  img?: string;
  children: React.JSX.Element | any;
  callback?: () => void;
  popupClassName?: string;
}): React.JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const closeRSVPForm = (): void => {
    setOpenModal(false);
  };

  return (
    <div className="cardContainer">
      <div className="cardImageContainer">
        <img
          src={img ? img : "https://fakeimg.pl/300x300?text=i+broke"}
          alt="wedding"
          className="cardImage"
        />
      </div>
      <button
        className="cardButton"
        onClick={() => {
          setOpenModal(true);
          callback && callback();
        }}
      >
        {label.toUpperCase()}
      </button>
      <Popup
        open={openModal}
        position="right center"
        closeOnDocumentClick={false}
        onClose={closeRSVPForm}
        className={`cardPopup ${popupClassName}`}
      >
        {children}
        <div className="modal">
          <button className="close" onClick={closeRSVPForm}>
            &times;
          </button>
        </div>
      </Popup>
    </div>
  );
};

export default Card;
