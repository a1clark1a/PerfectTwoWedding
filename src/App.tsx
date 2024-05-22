import React from "react";
import { Routes, Route } from "react-router-dom";

/*Routes */
import HomeRoute from "./routes/HomeRoute/homeRoute.component";
import LandingRoute from "./routes/LandingRoute/landingRoute.component";

import PrivateRoute from "./routes/PrivateRoute/privateRoute.component";

function App(): React.JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<LandingRoute />} />
      <Route
        path="/home"
        element={
          <PrivateRoute>
            <HomeRoute />
          </PrivateRoute>
        }
      />
    </Routes>
  );
}

export default App;
