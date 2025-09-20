import React from 'react';
import './Header.css'; // Assuming you will create a separate CSS file

const Header = () => {
  return (
    <header className="header">
      <div className="logo">
        <img src={require("../../assests/medistack-logo.png")} alt="MediStack Logo" />
        <span>MediStack</span>
      </div>
      <nav className="nav-links">
        <a href="#home">Home</a>
        <a href="#find-doctors">Find Doctors</a>
        <a href="#specialties">Specialties</a>
      </nav>
      <div className="auth-buttons">
        <button className="login">Login</button>
        <button className="sign-up">Sign Up</button>
      </div>
    </header>
  );
};

export default Header;