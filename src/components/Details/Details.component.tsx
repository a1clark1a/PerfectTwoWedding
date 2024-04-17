import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import Card from "../Card/Card.component";
import InviteCodeForm from "../InviteCodeForm/InviteCodeForm.component";

import { VerifiedCodeContext } from "../../context/verifiedCode.context";

import "./Details.styles.scss";
import ceremonyImg from "../../images/ceremony.jpg";
import cocktailHourImg from "../../images/cocktail.jpg";
import receptionHourImg from "../../images/reception.jpg";

const Details = (): React.JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const { currentVerifiedCode } = useContext(VerifiedCodeContext);

  const closeForm = (): void => {
    setOpenModal(false);
  };

  return (
    <section id="theDetails" className="detailsSection">
      <h2 className="sectionTitles">The Details</h2>
      {!currentVerifiedCode ? (
        <div className="content rsvpButtonContainer">
          <button className="rsvpButton" onClick={() => setOpenModal(true)}>
            Enter Code
          </button>
        </div>
      ) : (
        <div className="detailsContainer">
          <Card
            label="Ceremony"
            img={ceremonyImg}
            children={
              <div className="cardChildren">
                <div>Date</div>
                <span>Monday, September 23, 2024</span>
                <hr />
                <div>Ceremony & Reception</div>
                <span>28950 Highway 18, Skyforest, CA 92385</span>
                <span>Time: 3pm - 8pm</span>
                <hr />
                <div>Attire</div>
                <span>Formal | Cocktail</span>
              </div>
            }
          />

          <Card
            label="Cocktail Hour"
            img={cocktailHourImg}
            children={
              <div className="cardChildren">
                <div>Cocktail hour will follow the ceremony</div>
                <span>
                  Raise a glass to love and laughter during our cocktail hour,
                  featuring a delightful array of drinks and appetizers. Join in
                  mini games for a touch of excitement, and strike a pose at our
                  photo booth to create cherished memories.
                </span>
                <hr></hr>
                <div>Limited Open Bar</div>
                <span>
                  The bar will be available for service immediately following
                  the ceremony and will remain open until 30 minutes before the
                  conclusion of the reception. During brief intervals of
                  closure, a neon sign will indicate the bar's status, signaling
                  periods of operation and closure to guests.
                </span>
              </div>
            }
          />

          <Card
            label="Reception Hour"
            img={receptionHourImg}
            children={
              <div className="cardChildren">
                <div>Reception to follow cocktail hour</div>
                <span>Reception ends at 8pm</span>
                <span>
                  Celebrate with us by signing our guest book and pinning your
                  location on our world map, suggesting a destination for the
                  bride and groom's future travels.
                </span>
                <hr></hr>
                <span>
                  Enjoy a delightful dinner and indulge in our exquisite
                  selection of cakes and desserts.
                </span>
                <hr></hr>
                <span>
                  For those interested in contributing to our future adventures,
                  the Honeymoon Fund QR code will be available.
                </span>

                <span>Thank you for being a part of our celebration!</span>
              </div>
            }
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

export default Details;
