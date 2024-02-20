import React, { useContext, useState } from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import CountDownClock from "../CountDownClock/countDownClock.component";
import RSVP from "../RSVP/rsvp.component";

import { UserContext } from "../../context/user.context";

const HomePage = (): React.JSX.Element => {
  const [openModal, setOpenModal] = useState(false);
  const { currentUser } = useContext(UserContext);

  const alreadyAccepted = currentUser && currentUser.submit?.submitted;

  const closeRSVPForm = (): void => {
    setOpenModal(false);
  };
  return (
    <section>
      <div>
        <h2>
          <CountDownClock />
        </h2>
      </div>
      <div>
        <h1>Sara & Clark</h1>
      </div>
      <div>
        <h2>Date</h2>
      </div>
      <button onClick={() => setOpenModal(true)}>RSVP</button>

      <Popup
        open={openModal}
        position="right center"
        closeOnDocumentClick
        onClose={closeRSVPForm}
      >
        {alreadyAccepted ? (
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
