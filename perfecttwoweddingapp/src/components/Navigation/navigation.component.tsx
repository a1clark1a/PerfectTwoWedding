import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { signOutUser } from "../../firebase/utils";
import { UserContext } from "../../context/user.context";

const Navigation = (): React.JSX.Element => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  return (
    <nav>
      <ul>
        <li>
          <a href="#memoryLane">MEMORY LANE</a>
        </li>
        <li>
          <a href="#theDetails">THE DETAILS</a>
        </li>
        <li>
          <a href="#travelGuide">TRAVEL GUIDE</a>
        </li>
        <li>
          <a href="#FAQs">FAQs</a>
        </li>
        <li>
          <a href="#honeymoonGift">HONEYMOON GIFT</a>
        </li>
      </ul>
      <div>
        <button
          onClick={async () => {
            setCurrentUser(null);
            await signOutUser();
            navigate("/");
          }}
        >
          Logout
        </button>
      </div>
    </nav>
  );
};

export default Navigation;
