import React, { useState, useEffect } from "react";
import "./Navigation.style.scss";

const Navigation = () => {
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);
  const [isOpen, setIsOpen] = useState(false);

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
              <a href="#theDetails" onClick={() => setIsOpen(false)}>
                THE DETAILS
              </a>
            </li>
            <li>
              <a href="#travelGuide" onClick={() => setIsOpen(false)}>
                TRAVEL GUIDE
              </a>
            </li>
            <li>
              <a href="#memoryLane" onClick={() => setIsOpen(false)}>
                MEMORY LANE
              </a>
            </li>
            <li>
              <a href="#FAQs" onClick={() => setIsOpen(false)}>
                FAQs
              </a>
            </li>
            <li>
              <a href="#honeymoonGift">HONEYMOON GIFT</a>
            </li>
          </ul>
        </div>
      ) : (
        <div className="desktopMenu">
          <ul className="desktopMenuItems">
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
      )}
    </nav>
  );
};

export default Navigation;
