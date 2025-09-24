import Styles from './footer.module.css'
import { Link } from 'react-router-dom';
export default function Footer() {
    return (
        <footer className={Styles.footer}>
            <div className={Styles.footerContent}>
                <div className={Styles.footerSections}>
                    <div className={Styles.logo}>
                        <img src={require("../../assests/medistack-logo.png")} width={35} alt="Company Logo" />
                        <h2>DoctorsMedia</h2>
                        </div>
                    <p>Your trusted healthcare partner for finding the best doctors and booking appointments online.</p>
                    <div className={Styles.socialIcons}>
                        <a href="#"><i className="fab fa-facebook-f"> <img src={require("../../assests/facebook-svgrepo-com.png")} width={15}/> </i></a>
                        <a href="#"><i className="fab fa-twitter"> <img src={require("../../assests/twitter-svgrepo-com.png")} width={35}/></i></a>
                        <a href="#"><i className="fab fa-instagram"><img src={require("../../assests/instagram-svgrepo-com.png")} width={35}/></i></a>
                    </div>
                </div>
                <div className={Styles.footerSections}>
                    <h3>Quick Links</h3>
<ul>
  <li><Link to="/find-doctors">Find Doctor</Link></li>
  <li><Link to="/">Book Appointment</Link></li>
  <li><Link to="/about">About Us</Link></li>
  <li><Link to="#">Contact</Link></li>
</ul>
                </div>
                <div className={Styles.footerSections}>
                       <h3>Specialties</h3>
                    <ul>
                        <li><a href="#">Cardiology</a></li>
                        <li><a href="#">Dermatology</a></li>
                        <li><a href="#">Orthopedics</a></li>
                        <li><a href="#">Pediatrics</a></li>
                    </ul>
                </div>
                <div className={Styles.footerSections}>
                    <h3>Contact Us</h3>
                    <div className={Styles.ContactInfo}>
                        <img src={require("../../assests/phone-svgrepo-com.png")} width={20} alt="Location Icon" />
                   <p>+1 234 567 8900</p>
                    </div>
                    <div className={Styles.ContactInfo}>
                        <img src={require("../../assests/email-1-svgrepo-com.png")} width={20} alt="Location Icon" />
                    <p>support@medistack.com
                    </p>
                    </div>
                    <div className={Styles.ContactInfo}>
                        <img src={require("../../assests/location-pin-alt-1-svgrepo-com.png")} width={20} alt="Location Icon" />
                       <p>123 Health St., Wellness City, HC 45678</p>
                    </div>
                
                   
                </div>
            </div>
             <div className={Styles.footerBottom}>
                    <p>&copy;  2024 MediStack. All rights reserved.</p>
                    <nav>
                        <a href="#">Privacy Policy</a>
                        <a href="#">Terms of Service</a>
                        <a href="#">Cookie Policy</a>
                    </nav>
                </div>
        </footer>
    );
}   