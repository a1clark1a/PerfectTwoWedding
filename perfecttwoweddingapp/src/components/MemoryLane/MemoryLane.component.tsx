import React from "react";

import Card from "../Card/Card.component";

import "./MemoryLane.styles.scss";
import journeyImg from "../../images/clark and sara.jpg";
import engagementImg from "../../images/enagement.jpg";
import memoriesWithYouImg from "../../images/withguests.jpg";

const MemoryLane = (): React.JSX.Element => {
  return (
    <section id="memoryLane" className="memoryLaneSection">
      <h2 className="sectionTitles">Memory Lane</h2>
      <div className="memoryLaneContainer">
        <Card
          label="Our Journey"
          img={journeyImg}
          children={<div className="cardChildren">Our Journey</div>}
        />

        <Card
          label="Engagement"
          img={engagementImg}
          children={<div className="cardChildren">Engagement</div>}
        />

        <Card
          label="Memories with you"
          img={memoriesWithYouImg}
          children={<div className="cardChildren">Memories with you</div>}
        />
      </div>
    </section>
  );
};

export default MemoryLane;
