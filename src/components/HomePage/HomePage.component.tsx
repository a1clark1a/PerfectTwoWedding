import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";

import CountDownClock from "../CountDownClock/countDownClock.component";
import RSVP from "../RSVP/rsvp.component";
import InviteCodeForm from "../InviteCodeForm/InviteCodeForm.component";

import { VerifiedCodeContext } from "../../context/verifiedCode.context";

import "reactjs-popup/dist/index.css";
import "./HomePage.styles.scss";

import mobileBackgroundImage1 from "../../images/SAR01109-02.jpg";

const HomePage = (): React.JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const { currentVerifiedCode } = useContext(VerifiedCodeContext);

  const alreadySubmitted =
    currentVerifiedCode && currentVerifiedCode.submit?.submitted;

  const closeRSVPForm = (): void => {
    setOpenModal(false);
  };

  console.log(currentVerifiedCode);
  return (
    <section
      className="homePageSection"
      style={{ backgroundImage: `url(${mobileBackgroundImage1})` }}
    >
      <div className="homePageContainer">
        <div className="content">
          <CountDownClock />
        </div>
        <div className="content">
          <span className="homePageTitleName">Sara & Clark</span>
        </div>
        <div className="content">
          <span className="homePageDate">
            September 23, 2024 | Skyforest, CA
          </span>
        </div>
        <div className="content rsvpButtonContainer">
          <button
            className="rsvpButton"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            RSVP
          </button>
        </div>
      </div>
      <Popup
        open={openModal}
        position="right center"
        closeOnDocumentClick
        onClose={closeRSVPForm}
        className={!currentVerifiedCode ? "rsvpPopup" : "rsvpFormPopup"}
      >
        {!currentVerifiedCode ? (
          <InviteCodeForm />
        ) : alreadySubmitted ? (
          <div>
            You've already submitted your answer. If you wish to change it
            contact the Bride and Groom
          </div>
        ) : (
          <RSVP setCloseRSVP={closeRSVPForm} />
        )}
      </Popup>
    </section>
  );
};

export default HomePage;
