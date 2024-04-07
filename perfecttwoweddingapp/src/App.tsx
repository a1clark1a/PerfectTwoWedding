import React, { useContext } from "react";
import { Routes, Route } from "react-router-dom";

/*Routes */
import HomeRoute from "./routes/HomeRoute/homeRoute.component";
import NavigationRoute from "./routes/NavigationRoute/navigationRoute.component";
//import LandingRoute from "./routes/LandingRoute/landingRoute.component";

/*Context */
import { UserContext } from "./context/user.context";

import backgroundImage from "./images/background-02-01-01.jpg";
import PrivateRoute from "./routes/PrivateRoute/privateRoute.component";

function App(): React.JSX.Element {
  const { currentUser } = useContext(UserContext);

  // use private routes that is only accessible to logged users in context
  // if user is logged in, render landing page
  // if user is not logged in, render navigation page

  return (
    <div style={{ backgroundImage: `url(${backgroundImage})` }}>
      <NavigationRoute />
      <HomeRoute />
    </div>
    // <Routes>
    //   <Route path="/" element={<LandingRoute />} />
    //   <Route
    //     path="/home"
    //     element={
    //       <PrivateRoute>
    //         <NavigationRoute />
    //         <HomeRoute />
    //       </PrivateRoute>
    //     }
    //   />
    // </Routes>
  );
}

export default App;
