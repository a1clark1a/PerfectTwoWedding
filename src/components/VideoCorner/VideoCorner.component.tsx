import React, { useState, useEffect } from "react";
import YouTube from "react-youtube";

import "./videoCorner.styles.scss";

const VideoCorner = (): React.JSX.Element => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 767);

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
    <section id="loveStory" className="videoCornerSection">
      <h2 className="sectionTitles">Love Story</h2>
      <div className="videoContainer">
        <YouTube
          videoId={"qe2HgS4YeoM"}
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
    </section>
  );
};

export default VideoCorner;
