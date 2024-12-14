import React, { useState, useEffect } from "react";
import Popup from "reactjs-popup";

import "./Navigation.styles.scss";
import HMFDesktop from "../../images/HMF_Print-2.jpg";
import HMFMobile from "../../images/HMF_Print-mobile-01.jpg";

const Navigation = (): React.JSX.Element => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const handleResize = () => {
    setIsMobile(window.innerWidth <= 768);
  };

  useEffect(() => {
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar">
      {isMobile ? (
        <div className="navbar-container container">
          <input
            type="checkbox"
            id="menu-checkbox"
            checked={isOpen}
            onChange={toggleMenu}
          />
          <div className="hamburger-lines" onClick={toggleMenu}>
            <span className="line line1"></span>
            <span className="line line2"></span>
            <span className="line line3"></span>
          </div>
          <ul className={`menu-items ${isOpen ? "open" : ""}`}>
            <li>
              <a href="#TheWedding" onClick={() => setIsOpen(false)}>
                THE WEDDING
              </a>
            </li>
            {/* <li>
              <a href="#theDetails" onClick={() => setIsOpen(false)}>
                THE DETAILS
              </a>
            </li> */}
            {/* <li>
              <a href="#travelGuide" onClick={() => setIsOpen(false)}>
                TRAVEL GUIDE
              </a>
            </li> */}
            <li>
              <a href="#memoryLane" onClick={() => setIsOpen(false)}>
                MEMORY LANE
              </a>
            </li>
            {/* <li>
              <a href="#FAQs" onClick={() => setIsOpen(false)}>
                FAQs
              </a>
            </li> */}
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a
                onClick={() => {
                  setIsOpen(false);
                  setOpenModal(true);
                }}
              >
                HONEYMOON GIFT
              </a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="desktopMenu">
          <ul className="desktopMenuItems">
            <li>
              <a href="#TheWedding" onClick={() => setIsOpen(false)}>
                THE WEDDING
              </a>
            </li>
            {/* <li>
              <a href="#theDetails">THE DETAILS</a>
            </li> */}
            {/* <li>
              <a href="#travelGuide">TRAVEL GUIDE</a>
            </li> */}
            <li>
              <a href="#memoryLane">MEMORY LANE</a>
            </li>
            {/* <li>
              <a href="#FAQs">FAQs</a>
            </li> */}
            <li>
              {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a onClick={() => setOpenModal(true)}>HONEYMOON GIFT</a>
            </li>
          </ul>
        </div>
      )}
      <Popup
        open={openModal}
        onClose={() => {
          setOpenModal(false);
        }}
        closeOnDocumentClick
        className="hmfPopup"
      >
        <img
          src={isMobile ? HMFMobile : HMFDesktop}
          alt="Honeymoon Fund"
          className="hmfImg"
        />
        <div className="modal">
          <button className="close" onClick={() => setOpenModal(false)}>
            &times;
          </button>
        </div>
      </Popup>
    </nav>
  );
};

export default Navigation;
