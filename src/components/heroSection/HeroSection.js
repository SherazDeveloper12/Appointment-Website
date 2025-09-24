import Styles from './heroSection.module.css';
import Button from '../button/Button';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
export default function HeroSection() {
    const user = useSelector((state) => state.auth.User);
    return (
        <section className={Styles.hero}>
            <div className={Styles.HeroContaienr}>
            <h1>Find & Book the Best Doctors Near You</h1>
            <p>Discover trusted healthcare professionals, read genuine reviews, and book appointments instantly. Your health is our priority.</p>
            <div className={Styles.buttonContainer}>
                {(user)? <><Link to="/profile"> <Button className={Styles.Button} text="View Dashboard" /></Link></>:<><Link to="/signup"> <Button className={Styles.Button} text="Get Started" /></Link></> }
               
                
                  <Link to="/find-doctors"> <Button className={Styles.Button} text="Find Doctor" /></Link>
              
            </div>
              </div>
        </section>
    );
}