import React from 'react';
import './Header.css'; // Assuming you will create a separate CSS file
import { useState } from 'react';
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] =useState(false);
  return (
    <header className="header">
      <div className="logo">
        <img src={require("../../assests/medistack-logo.png")} alt="MediStack Logo" />
        <span>MediStack</span>
      </div>
      <div className='toggle'>
        <img className='togglebtn' src={require("../../assests/drawer.png")} width={45} onClick={()=>setIsMenuOpen(!isMenuOpen)} alt="Toggle Menu" />
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className='sidebaroverlay'></div>
          <div className='sidebarmenu'>
          <div className='sidebar'>
          <a href="#home" onClick={()=>setIsMenuOpen(false)}>Home</a>
          <a href="#find-doctors" onClick={()=>setIsMenuOpen(false)}>Find Doctors</a>
          <a href="#specialties" onClick={()=>setIsMenuOpen(false)}>Specialties</a>
          <button className="login" onClick={()=>setIsMenuOpen(false)}>Login</button>
          <button className="sign-up" onClick={()=>setIsMenuOpen(false)}>Sign Up</button>
          </div>
            <div className='closebtn'>
            <img src={require("../../assests/exit-to-app-button.png")} width={30} onClick={()=>setIsMenuOpen(false)} alt="Close Menu" />
          </div>
          </div>
        </div>
      )}
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