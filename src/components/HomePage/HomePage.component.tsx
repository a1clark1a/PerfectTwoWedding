import React, { useContext, useEffect, useState } from "react";
// import Popup from "reactjs-popup";

// import CountDownClock from "../CountDownClock/countDownClock.component";
// import RSVP from "../RSVP/rsvp.component";
// import InviteCodeForm from "../InviteCodeForm/InviteCodeForm.component";

//import { VerifiedCodeContext } from "../../context/verifiedCode.context";

import { VideosContext } from "../../context/videos.context";
import { VideoFilePath } from "../../types";
import Card from "../Card/Card.component";

import "reactjs-popup/dist/index.css";
import "./HomePage.styles.scss";

import mobileBackgroundImage1 from "../../images/WeddingDay.jpg";
import weddingHighlightImg from "../../images/weddingHighlight.jpg";

const HomePage = (): React.JSX.Element => {
  // const [openModal, setOpenModal] = useState(false);
  // const { currentVerifiedCode } = useContext(VerifiedCodeContext);
  const { getVideos, videos, videosLoading, setVideosLoading } =
    useContext(VideosContext);

  // const alreadySubmitted =
  //   currentVerifiedCode && currentVerifiedCode.submit?.submitted;

  // const closeRSVPForm = (): void => {
  //   setOpenModal(false);
  // };

  return (
    <section
      className="homePageSection"
      style={{ backgroundImage: `url(${mobileBackgroundImage1})` }}
    >
      <div className="homePageContainer">
        <div className="content">{/*<CountDownClock /> */}</div>
        <div className="content">
          <span className="homePageTitleName">Sara & Clark</span>
        </div>
        <div className="content">
          <span className="homePageDate">
            Thank you for sharing this wonderful moment with us! We can't wait
            to share the pictures and videos!
          </span>
        </div>
        <div className="content">
          <Card
            label="Wedding Highlight"
            img={weddingHighlightImg}
            loading={videosLoading}
            children={
              <video
                controlsList="nodownload"
                controls
                width="100%"
                height="500px"
                autoPlay
              >
                <source
                  src={videos[VideoFilePath.weddingHighlight]}
                  type="video/mp4"
                />
                Your browser does not support the video tag.
              </video>
            }
            callback={() => {
              setVideosLoading(true);
              getVideos(VideoFilePath.weddingHighlight);
            }}
            popupClassName="MemoryLanePopup"
          />
        </div>
        <div className="content">
          <span className="Message"></span>
        </div>
        {/* <div className="content rsvpButtonContainer">
          <button
            className="rsvpButton"
            onClick={() => {
              setOpenModal(true);
            }}
          >
            RSVP
          </button>
        </div> */}
      </div>
      {/* <Popup
        open={openModal}
        position="right center"
        closeOnDocumentClick={false}
        onClose={closeRSVPForm}
        nested
        className={!currentVerifiedCode ? "rsvpPopup" : "rsvpFormPopup"}
      >
        <div className="rsvpResponseContainer">
          {!currentVerifiedCode ? (
            <InviteCodeForm />
          ) : alreadySubmitted ? (
            <>
              <div className="rsvpResponseTitle">
                THANK YOU! YOUR RSVP HAS BEEN SENT!
              </div>
              <hr />
              <div className="rsvpResponeInfo">
                You've already submitted your answer. If you wish to change it
                contact the Bride and Groom.
              </div>
              <hr />
              <div className="listNamesTitle">Attending:</div>
              <ul className="listNames">
                {
                  // main invite
                  currentVerifiedCode.invitedNames.map((invitee) => {
                    return (
                      invitee.accepted && (
                        <li key={invitee.name}>{invitee.name}</li>
                      )
                    );
                  })
                }
                {
                  // kids
                  currentVerifiedCode.kids.allowKids &&
                    currentVerifiedCode.kids.kidsNames &&
                    currentVerifiedCode.kids.kidsNames.length > 0 &&
                    currentVerifiedCode.kids.kidsNames.map((kid) => {
                      return kid.accepted && <li key={kid.name}>{kid.name}</li>;
                    })
                }
                {
                  // plus one
                  currentVerifiedCode.plusOne.allow &&
                    currentVerifiedCode.plusOne.accepted && (
                      <li>{currentVerifiedCode.plusOne.name}</li>
                    )
                }
              </ul>
              <div className="listNamesTitle">Not Attending:</div>
              <ul className="listNames">
                {
                  // main invite
                  currentVerifiedCode.invitedNames.map((invitee) => {
                    return (
                      invitee.accepted === false && (
                        <li key={invitee.name}>{invitee.name}</li>
                      )
                    );
                  })
                }
                {
                  // kids
                  currentVerifiedCode.kids.allowKids &&
                    currentVerifiedCode.kids.kidsNames &&
                    currentVerifiedCode.kids.kidsNames.length > 0 &&
                    currentVerifiedCode.kids.kidsNames.map((kid) => {
                      return (
                        kid.accepted === false && (
                          <li key={kid.name}>{kid.name}</li>
                        )
                      );
                    })
                }
                {
                  // plus one
                  currentVerifiedCode.plusOne.allow &&
                    currentVerifiedCode.plusOne.accepted === false && (
                      <li>
                        {!currentVerifiedCode.plusOne.name
                          ? "Plus one: No Name"
                          : currentVerifiedCode.plusOne.name}
                      </li>
                    )
                }
              </ul>

              {currentVerifiedCode.message && (
                <>
                  <hr />
                  <div className="inviteeMessageTitle">Your message:</div>
                  <div className="inviteeMessage">
                    - `{currentVerifiedCode.message}`
                  </div>
                </>
              )}
            </>
          ) : (
            <RSVP setCloseRSVP={closeRSVPForm} />
          )}
          <div className="modal">
            <button className="close" onClick={closeRSVPForm}>
              &times;
            </button>
          </div>
        </div>
      </Popup> */}
    </section>
  );
};

export default HomePage;
