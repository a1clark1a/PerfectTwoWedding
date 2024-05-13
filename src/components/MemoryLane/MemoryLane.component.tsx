import React, { useContext, useState } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import Card from "../Card/Card.component";

import { ImagesContext } from "../../context/images.context";

import "yet-another-react-lightbox/styles.css";
import "./MemoryLane.styles.scss";
import journeyImg from "../../images/clark and sara.jpg";
import engagementImg from "../../images/enagement.jpg";
import memoriesWithYouImg from "../../images/withguests.jpg";

const MemoryLane = (): React.JSX.Element => {
  const [index, setIndex] = useState<number>(-1);
  const { images, getImages, imagesLoading, setImagesLoading } =
    useContext(ImagesContext);

  return (
    <section id="memoryLane" className="memoryLaneSection">
      <h2 className="sectionTitles">Memory Lane</h2>

      <div className="memoryLaneContainer">
        <Card
          label="Our Journey"
          img={journeyImg}
          children={
            imagesLoading ? (
              <div className="cardChildren">
                <div>Loading...</div>
                <span>
                  Please wait while the images load. If this is your first time
                  here this will take some time.
                </span>
              </div>
            ) : (
              <>
                <PhotoAlbum
                  layout="masonry"
                  columns={(containerWidth) => {
                    if (containerWidth < 400) return 2;
                    if (containerWidth < 800) return 4;
                    return 5;
                  }}
                  spacing={10}
                  photos={images["OurJourney"]}
                  onClick={({ index: current }) => setIndex(current)}
                />
                <Lightbox
                  index={index}
                  slides={images["OurJourney"]}
                  open={index >= 0}
                  close={() => setIndex(-1)}
                />
              </>
            )
          }
          callback={async () => {
            setImagesLoading(true);
            await getImages("OurJourney");
          }}
          popupClassName="MemoryLanePopup"
        />

        <Card
          label="Engagement"
          img={engagementImg}
          children={
            imagesLoading ? (
              <div className="cardChildren">
                <div>Loading...</div>
                <span>
                  Please wait while the images load. These are some high quality
                  images your Iphone can't keep up.
                </span>
              </div>
            ) : (
              <>
                <PhotoAlbum
                  layout="columns"
                  columns={(containerWidth) => {
                    if (containerWidth < 400) return 2;
                    if (containerWidth < 800) return 4;
                    return 5;
                  }}
                  spacing={10}
                  photos={images["Engagement"]}
                  onClick={({ index: current }) => setIndex(current)}
                />
                <Lightbox
                  index={index}
                  slides={images["Engagement"]}
                  open={index >= 0}
                  close={() => setIndex(-1)}
                />
              </>
            )
          }
          callback={async () => {
            setImagesLoading(true);
            await getImages("Engagement");
          }}
          popupClassName="MemoryLanePopup"
        />

        <Card
          label="Memories with you"
          img={memoriesWithYouImg}
          children={
            imagesLoading ? (
              <div className="cardChildren">
                <div>Loading...</div>
                <span>
                  Please wait while the images load. We've made a lot of
                  memories with you.
                </span>
              </div>
            ) : (
              <>
                <PhotoAlbum
                  layout="masonry"
                  columns={(containerWidth) => {
                    if (containerWidth < 400) return 2;
                    if (containerWidth < 800) return 4;
                    return 5;
                  }}
                  spacing={10}
                  photos={images["MemoriesWithYou"]}
                  onClick={({ index: current }) => setIndex(current)}
                />
                <Lightbox
                  index={index}
                  slides={images["MemoriesWithYou"]}
                  open={index >= 0}
                  close={() => setIndex(-1)}
                />
              </>
            )
          }
          callback={async () => {
            setImagesLoading(true);
            await getImages("MemoriesWithYou");
          }}
          popupClassName="MemoryLanePopup"
        />
      </div>
    </section>
  );
};

export default MemoryLane;
