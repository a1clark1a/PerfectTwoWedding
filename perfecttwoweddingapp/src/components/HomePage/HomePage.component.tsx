import React from "react";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

import CountDownClock from "../CountDownClock/countDownClock.component";
import RSVP from "../RSVP/rsvp.component";

const HomePage = (): React.JSX.Element => {
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
      <div></div>
      <Popup
        trigger={(open) => <button>RSVP</button>}
        position="right center"
        closeOnDocumentClick
      >
        <RSVP />
      </Popup>
    </section>
  );
};

export default HomePage;
