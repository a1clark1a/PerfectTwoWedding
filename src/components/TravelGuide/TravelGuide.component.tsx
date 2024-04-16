import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";

import Card from "../Card/Card.component";
import InviteCodeForm from "../InviteCodeForm/InviteCodeForm.component";

import { VerifiedCodeContext } from "../../context/verifiedCode.context";

import "./TravelGuide.styles.scss";
import lodgingImg from "../../images/lodging.jpg";
import thingsToDoImg from "../../images/image.png";

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
            children={
              <div className="cardChildren">
                <div>Lake Arrowhead Resort & Spa</div>
                <span>2.7 miles - 9 mintues away</span>
                <span>27984 Highway 189 Lake Arrowhead, CA 92352</span>
                <span>(909) 744-3062</span>
                <a
                  href="https://www.lakearrowheadresort.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  LakeArrowheadResort.com
                </a>
                <hr />
                <div>The Kingsley Hotel</div>
                <span>3.2 miles - 7 mintues away</span>
                <span>306 Lock Leven Road Lake Arrowhead, CA 92352</span>
                <span>(909) 719-0306</span>
                <a
                  href="https://www.thekingsleyla.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  TheKingsleyLA.com
                </a>
                <hr />
                <div>SkyView Inn</div>
                <span>0.5 miles - 3 mintues away</span>
                <span>28717 State Highway 18 Skyforest, CA 92385</span>
                <span>(909) 744-8822</span>
                <a
                  href="https://www.theskyviewinn.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  theskyviewinn.com
                </a>
                <hr />
                <div>SaddleBack Inn</div>
                <span>2.3 miles - 7 mintues away</span>
                <span>
                  300 South State Highway 173 Lake Arrowhead, CA 92352
                </span>
                <span>(800) 858-3334</span>
                <a
                  href="https://saddlebackinn.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  SaddlebackInn.com
                </a>
              </div>
            }
          />
          <Card
            label="Things to do"
            img={thingsToDoImg}
            children={
              <div className="cardChildren">
                <div>SkyPark at Santa’s Village </div>
                <span>
                  Perfect for kids. Enjoy zipline, climbing tower, train ride,
                  archery range, ax challenge, sharpshooter gallery, and more!
                </span>
                <span>
                  If you would like to buy tickets please contact the Bridge and
                  Groom for discounts.
                </span>
                <a
                  href="https://skyparksantasvillage.com/parks/skypark/activities/"
                  target="_blank"
                  rel="noreferrer"
                >
                  skyparksantasvillage.com
                </a>
                <hr />
                <div>Hiking</div>
                <hr />
                <div>Lake Arrowhead Village</div>
                <span>
                  Explore quaint shops, indulge in delicious dining options, and
                  enjoy a variety of recreational activities, from boating and
                  fishing to hiking and skiing.
                </span>
                <a
                  href="https://www.thelakearrowheadvillage.com/"
                  target="_blank"
                  rel="noreferrer"
                >
                  thelakearrowheadvillage.com
                </a>
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

export default TravelGuide;
