import React from "react";
import logo from "../img/logo.png";

const Header: React.FC = () => (
  <header className="header">
    <div className="logo-title">
      <img src={logo} alt="Logo" className="logo-icon" />
      <h1>SpeakRight</h1>
    </div>
  </header>
);

export default Header;
