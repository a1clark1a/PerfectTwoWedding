import React from "react";

import CountDownClock from "../CountDownClock/countDownClock.component";

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
      <div>
        <button>RSVP</button>
      </div>
    </section>
  );
};

export default HomePage;
