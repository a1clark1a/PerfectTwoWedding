import React, { useState, useEffect, useContext } from "react";
import YouTube from "react-youtube";
import PhotoAlbum from "react-photo-album";
import Lightbox from "yet-another-react-lightbox";

import Card from "../Card/Card.component";

import { VideosContext } from "../../context/videos.context";
import { ImagesContext } from "../../context/images.context";
import { VideoFilePath } from "../../types";

import "./videoCorner.styles.scss";

import weddingTeaser from "../../images/weddingTeaser.jpg";
import weddingPhotos from "../../images/weddingPhotos.jpg";
import loveStory from "../../images/loveStory.jpg";
import photobooth from "../../images/photobooth.jpg";

const VideoCorner = (): React.JSX.Element => {
  const [index, setIndex] = useState<number>(-1);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);
  const { getVideos, videos, setVideosLoading, videosLoading } =
    useContext(VideosContext);
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
    <section id="TheWedding" className="videoCornerSection">
      <h2 className="sectionTitles">The Wedding</h2>

      <div className="memoryLaneContainer">
        <Card
          label="Wedding Teaser"
          img={weddingTeaser}
          loading={videosLoading}
          children={
            <video
              controlsList="nodownload"
              controls
              width="100%"
              height="500px"
              autoPlay
            >
              <source
                src={videos[VideoFilePath.weddingTeaser]}
                type="video/mp4"
              />
              Your browser does not support the video tag.
            </video>
          }
          callback={() => {
            setVideosLoading(true);
            getVideos(VideoFilePath.weddingTeaser);
          }}
          popupClassName="MemoryLanePopup"
        />

        <Card
          label="Wedding Photos"
          img={weddingPhotos}
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
                photos={images["Wedding"]}
                onClick={({ index: current }) => setIndex(current)}
              />
              <Lightbox
                index={index}
                slides={images["Wedding"]}
                open={index >= 0}
                close={() => setIndex(-1)}
              />
            </>
          }
          callback={() => {
            setImagesLoading(true);
            getImages("Wedding");
          }}
          popupClassName="MemoryLanePopup"
        />
        <Card
          label="Photo Booth"
          img={photobooth}
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
                photos={images["PhotoBooth"]}
                onClick={({ index: current }) => setIndex(current)}
              />
              <Lightbox
                index={index}
                slides={images["PhotoBooth"]}
                open={index >= 0}
                close={() => setIndex(-1)}
              />
            </>
          }
          callback={() => {
            setImagesLoading(true);
            getImages("PhotoBooth");
          }}
          popupClassName="MemoryLanePopup"
        />

        <Card
          label="Love Story"
          img={loveStory}
          loading={videosLoading}
          children={
            <video
              controlsList="nodownload"
              controls
              width="100%"
              height="500px"
              autoPlay
            >
              <source src={videos[VideoFilePath.loveStory]} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          }
          callback={() => {
            setVideosLoading(true);
            getVideos(VideoFilePath.loveStory);
          }}
          popupClassName="MemoryLanePopup"
        />
        {/* <YouTube
          videoId={"qe2HgS4YeoM"}
          opts={{
            width: isMobile ? 320 : 700,
            height: 390,
            playerVars: {
              autoplay: 0,
              rel: 0,
            },
          }}
        /> */}
      </div>
    </section>
  );
};

export default VideoCorner;
