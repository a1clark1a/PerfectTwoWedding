import React, { useContext, useState, useEffect } from "react";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";
import YouTube from "react-youtube";

import Card from "../Card/Card.component";

import { ImagesContext } from "../../context/images.context";

import "yet-another-react-lightbox/styles.css";
import "./MemoryLane.styles.scss";
import journeyImg from "../../images/clark and sara.jpg";
import engagementImg from "../../images/enagement.jpg";
import memoriesWithYouImg from "../../images/withguests.jpg";

const MemoryLane = (): React.JSX.Element => {
  const [index, setIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const { images, getImages, imagesLoading, setImagesLoading } =
    useContext(ImagesContext);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 767);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <section id="memoryLane" className="memoryLaneSection">
      <h2 className="sectionTitles">Memory Lane</h2>

      <div className="memoryLaneContainer">
        <Card
          label="Our Journey"
          img={journeyImg}
          loading={imagesLoading}
          children={
            <>
              <div className="videoContainer">
                <YouTube
                  videoId={"b2O2MwYVHkQ"}
                  opts={{
                    width: isMobile ? 320 : 700,
                    height: 390,
                    playerVars: {
                      autoplay: 0,
                      rel: 0,
                    },
                  }}
                />
              </div>

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
          }
          callback={() => {
            setImagesLoading(true);
            getImages("OurJourney");
          }}
          popupClassName="MemoryLanePopup"
        />

        <Card
          label="Engagement"
          img={engagementImg}
          loading={imagesLoading}
          children={
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
          }
          callback={() => {
            setImagesLoading(true);
            getImages("Engagement");
          }}
          popupClassName="MemoryLanePopup"
        />

        <Card
          label="Memories with you"
          img={memoriesWithYouImg}
          loading={imagesLoading}
          children={
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
          }
          callback={() => {
            setImagesLoading(true);
            getImages("MemoriesWithYou");
          }}
          popupClassName="MemoryLanePopup"
        />
      </div>
    </section>
  );
};

export default MemoryLane;
