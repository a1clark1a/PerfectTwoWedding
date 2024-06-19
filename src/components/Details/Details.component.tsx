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
                <a
                  href="https://skyparksantasvillage.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  Sky Park at Santa's Village
                </a>
                <a
                  href="https://maps.app.goo.gl/1nuCHiukQNQqKt4C9"
                  target="_blank"
                  rel="noreferrer"
                >
                  28950 Highway 18, Skyforest, CA 92385
                </a>
                <br></br>
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
                <div>Cocktail Hour</div>
                <span>
                  Sign our guest book and pin your location on our world map,
                  for the newlyweds' next adventure!
                </span>
                <hr></hr>
                <span>
                  Please enjoy beverages / alcohol, appetizers, photo booth, and
                  mini games.
                  <br />
                  <br />
                  <span>
                    The Bride and Groom will each have their own specialty
                    drink!
                  </span>
                </span>
                <hr></hr>
                <div>Limited Open Bar</div>
                <span>
                  The bar will be open starting from the end of the ceremony
                  until 30 minutes before the reception ends. A neon sign will
                  signal when it's closed.
                </span>
              </div>
            }
          />

          <Card
            label="Reception"
            img={receptionHourImg}
            children={
              <div className="cardChildren">
                <div>Reception to follow Cocktail Hour</div>
                <span>Reception ends at 8pm</span>
                <span>
                  Enjoy a delightful dinner and indulge in our exquisite
                  selection of pastries and desserts.
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
