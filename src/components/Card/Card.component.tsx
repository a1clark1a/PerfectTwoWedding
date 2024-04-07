import React, { useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import "./Card.styles.scss";

const Card = ({
  label,
  img,
  children,
}: {
  label: string;
  img?: string;
  children: React.JSX.Element;
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
      <button className="cardButton" onClick={() => setOpenModal(true)}>
        {label.toUpperCase()}
      </button>
      <Popup
        open={openModal}
        position="right center"
        closeOnDocumentClick
        onClose={closeRSVPForm}
      >
        {children}
      </Popup>
    </div>
  );
};

export default Card;
