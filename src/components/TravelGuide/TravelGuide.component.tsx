import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";

import Card from "../Card/Card.component";
import InviteCodeForm from "../InviteCodeForm/InviteCodeForm.component";

import { VerifiedCodeContext } from "../../context/verifiedCode.context";

import "./TravelGuide.styles.scss";
import lodgingImg from "../../images/lodging.jpg";
import thingsToDoImg from "../../images/things to do.jpg";

const TravelGuide = (): React.JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const { currentVerifiedCode } = useContext(VerifiedCodeContext);

  const closeForm = (): void => {
    setOpenModal(false);
  };

  return (
    <section id="travelGuide" className="travelGuideSection">
      <h2 className="sectionTitles">Travel Guide</h2>
      {!currentVerifiedCode ? (
        <div className="content rsvpButtonContainer">
          <button className="rsvpButton" onClick={() => setOpenModal(true)}>
            Enter Code
          </button>
        </div>
      ) : (
        <div className="travelGuideContainer">
          <Card
            label="Lodging"
            img={lodgingImg}
            children={<div>Lodging stuff</div>}
          />
          <Card
            label="Things to do"
            img={thingsToDoImg}
            children={<div>Things to do</div>}
          />
        </div>
      )}

      <Popup
        open={openModal}
        position="right center"
        closeOnDocumentClick
        onClose={closeForm}
        className="rsvpPopup"
      >
        <InviteCodeForm closeForm={closeForm} />
      </Popup>
    </section>
  );
};

export default TravelGuide;
