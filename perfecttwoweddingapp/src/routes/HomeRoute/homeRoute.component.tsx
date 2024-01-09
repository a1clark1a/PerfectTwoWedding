import { Fragment } from "react";

// components
import HomePage from "../../components/HomePage/HomePage.component";
import MemoryLane from "../../components/MemoryLane/MemoryLane.component";
import FAQ from "../../components/FAQ/FAQ.component";
import TravelGuide from "../../components/TravelGuide/travelGuide.component";
import Details from "../../components/Details/details.component";

const HomeRoute = (): React.JSX.Element => {
  return (
    <Fragment>
      <HomePage />
      <MemoryLane />
      <Details />
      <TravelGuide />
      <FAQ />
    </Fragment>
  );
};

export default HomeRoute;
