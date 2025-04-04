import React from "react";
import "../style.css";

const Header = ({ toggleSidebar }) => {
  return (
    <div className="header">
      <div className="nav">
        <div className="hamburgercontainer" onClick={toggleSidebar}>
          <img
            width="40"
            className="invert hamburger"
            src="/img/hamburger.svg"
            alt="Menu"
          />
        </div>
      </div>
      <div className="button">
        <button className="signupbtn">Sign up</button>
        <button className="loginbtn">Log in</button>
      </div>
    </div>
  );
};

export default Header;
