import React from 'react';
import './Header.css'; // Assuming you will create a separate CSS file
import { useState } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="logo">
        <img src={require("../../assests/medistack-logo.png")} alt="MediStack Logo" />
        <span>MediStack</span>
      </div>
      <div className='toggle'>
        <img className='togglebtn' src={require("../../assests/drawer.png")} width={45} onClick={() => setIsMenuOpen(!isMenuOpen)} alt="Toggle Menu" />
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
          <div className='sidebaroverlay'></div>
          <div className='sidebarmenu'>
            <div className='sidebar'>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/find-doctors" onClick={() => setIsMenuOpen(false)}>Find Doctors</Link>
              <Link to="/specialties" onClick={() => setIsMenuOpen(false)}>Specialties</Link>
            <Link to="/login" ><button onClick={() => setIsMenuOpen(false)} className="login">Login</button></Link>
        <Link to="/signup"><button onClick={() => setIsMenuOpen(false)} className="sign-up">Sign Up</button></Link>
  
            </div>
            <div className='closebtn'>
              <img src={require("../../assests/exit-to-app-button.png")} width={30} onClick={() => setIsMenuOpen(false)} alt="Close Menu" />
            </div>
          </div>
        </div>
      )}
      <nav className="nav-links">
        <Link to="/">Home</Link>
        <Link to="/find-doctors">Find Doctors</Link>
        <Link to="/specialties">Specialties</Link>
      </nav>
      <div className="auth-buttons">
        <Link to="/login"><button className="login">Login</button></Link>
        <Link to="/signup"><button className="sign-up">Sign Up</button></Link>
         
      </div>
    </header>
  );
};

export default Header;