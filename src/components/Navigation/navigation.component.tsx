import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";

import { signOutUser } from "../../firebase/utils";
import { UserContext } from "../../context/user.context";

import "./navigation.style.scss";

const Navigation = (): React.JSX.Element => {
  const { setCurrentUser } = useContext(UserContext);
  const navigate = useNavigate();

  // TODO fix navbar
  const mobileView = () => {
    return (
      <nav className="navbar">
        <div className="navbar-container container">
          <input type="checkbox" name="" id="" />
          <div className="hamburger-lines">
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className="menu-items">
            <li>
              <a href="#theDetails">THE DETAILS</a>
            </li>
            <li>
              <a href="#travelGuide">TRAVEL GUIDE</a>
            </li>
            <li>
              <a href="#memoryLane">MEMORY LANE</a>
            </li>
            <li>
              <a href="#FAQs">FAQs</a>
            </li>
            <li>
              <a href="#honeymoonGift">HONEYMOON GIFT</a>
            </li>
          </ul>
        </div>
      </nav>
    );
  };

  const desktopView = () => {
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
          {/* <button
          onClick={async () => {
            setCurrentUser(null);
            await signOutUser();
            navigate("/");
          }}
        >
          Logout
        </button> */}
        </div>
      </nav>
    );
  };

  return true && mobileView();
};

export default Navigation;
