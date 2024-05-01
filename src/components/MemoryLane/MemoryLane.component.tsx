import React, { useState } from "react";

import Card from "../Card/Card.component";

import "./MemoryLane.styles.scss";
import journeyImg from "../../images/clark and sara.jpg";
import engagementImg from "../../images/enagement.jpg";
import memoriesWithYouImg from "../../images/withguests.jpg";
import { getImages } from "../../firebase/utils";

const MemoryLane = (): React.JSX.Element => {
  const [images, setImages] = useState<any[]>([]);

  const handleGetImages = async (folderName: string) => {
    setImages(await getImages(folderName));
  };

  return (
    <section id="memoryLane" className="memoryLaneSection">
      <h2 className="sectionTitles">Memory Lane</h2>
      <div className="memoryLaneContainer">
        <Card
          label="Our Journey"
          img={journeyImg}
          children={
            <div className="cardChildren">
              Our Journey
              <div>
                <img src={images[0].url} />;
                {/* {images.length &&
                  images.map((image) => {
                    return <img src={images[0].url} />;
                  })} */}
              </div>
            </div>
          }
          callback={() => handleGetImages("OurJourney")}
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
