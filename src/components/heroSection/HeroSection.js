import Styles from './heroSection.module.css';
import Button from '../button/Button';
export default function HeroSection() {
    return (
        <section className={Styles.hero}>
            <div className={Styles.HeroContaienr}>
            <h1>Find & Book the Best Doctors Near You</h1>
            <p>Discover trusted healthcare professionals, read genuine reviews, and book appointments instantly. Your health is our priority.</p>
            <div className={Styles.buttonContainer}>
                <Button className={Styles.Button} text="Get Started" />
                <Button className={Styles.Button} text="Learn More" />
              
            </div>
              </div>
        </section>
    );
}