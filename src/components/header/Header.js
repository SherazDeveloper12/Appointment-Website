import React from 'react';
import './Header.css'; // Assuming you will create a separate CSS file
import { useSelector } from 'react-redux';
import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { logout } from '../../features/slices/authslice';
import { useNavigate } from 'react-router-dom';
const Header = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const logouthandler = () => { 
    setIsMenuOpen(false)
      dispatch(logout());
  };
     const user = useSelector((state) => state.auth.User);
    const logoclickhandler = () => {
    navigate('/');
    console.log('logo clicked');
  }
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <header className="header">
      <div className="logo" onClick={()=>logoclickhandler()}>
        <img src={require("../../assests/medistack-logo.png")} alt="MediStack Logo" />
        <span>DoctorsMedia</span>
      </div>
      <div className='toggle'>
        <img className='togglebtn' src={require("../../assests/drawer.png")} width={45} onClick={() => setIsMenuOpen(!isMenuOpen)} alt="Toggle Menu" />
      </div>
      {isMenuOpen && (
        <div className="mobile-menu">
          <div onClick={() => setIsMenuOpen(false)} className='sidebaroverlay'></div>
          <div className='sidebarmenu'>
            <div className='sidebar'>
              <Link to="/" onClick={() => setIsMenuOpen(false)}>Home</Link>
              <Link to="/find-doctors" onClick={() => setIsMenuOpen(false)}>Find Doctors</Link>
              <Link to="/specialties" onClick={() => setIsMenuOpen(false)}>Specialties</Link>
            {(user)? <>
            <Link to="/" ><button onClick={() =>logouthandler() } className="login">Logout</button></Link>
            <Link to="/profile"><button className="profilebtn"> <img src={require("../../assests/user-single-gray.png")} width={25} /> <p> {user.name} </p>    </button></Link>
             </>:  
            <><Link to="/login" ><button onClick={() => setIsMenuOpen(false)} className="login">Login</button></Link>
        <Link to="/signup"><button onClick={() => setIsMenuOpen(false)} className="sign-up">Sign Up</button></Link>
  </> }
           
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
        {(user)? 
        <>
        <Link to="/profile"><button className="profilebtn"> <img src={require("../../assests/user-single-gray.png")} width={25} /> <p> {user.name} </p>    </button></Link>
        <Link to="/" onClick={()=>logouthandler()}><button className="login">Logout</button></Link>
          </>
          : 
        <>        <Link to="/login"><button className="login">Login</button></Link>

        <Link to="/signup"><button className="sign-up">Sign Up</button></Link>
         </>}
        
      </div>
    </header>
  );
};

export default Header;