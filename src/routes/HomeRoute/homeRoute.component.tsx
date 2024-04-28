import { Fragment } from "react";
import ScrollToTop from "react-scroll-to-top";

// components
import HomePage from "../../components/HomePage/HomePage.component";
import MemoryLane from "../../components/MemoryLane/MemoryLane.component";
import FAQ from "../../components/FAQ/FAQ.component";
import TravelGuide from "../../components/TravelGuide/TravelGuide.component";
import Details from "../../components/Details/Details.component";
import Footnote from "../../components/Footnote/Footnote.component";

const HomeRoute = (): React.JSX.Element => {
  return (
    <Fragment>
      <HomePage />
      <Details />
      <TravelGuide />
      <MemoryLane />
      <FAQ />
      <Footnote />
      <ScrollToTop
        smooth
        color="#1b1c1e"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      />
    </Fragment>
  );
};

export default HomeRoute;
