import Styles from './mediastackdetailscontainer.module.css'
export default function MediaStackDetailsContainer() {
    return (
        <div className={Styles.mediaStackDetailsContainer}>
       <div className={Styles.Heading}>
        <h2>Why Choose MediStack</h2>
        <p>Experience healthcare like never before</p>
        <img src={require("../../assests/horizontal-rule-svgrepo-com.png")}  alt="underline" />
       </div>
       <div className={Styles.detailBoxesContainer}>
        <div className={Styles.detailBoxes}>
            <div className={Styles.imageContainer}>
            <img src={require("../../assests/clock-svgrepo-com.png")} width={50} alt="Quality Icon" className={Styles.icon} />
        </div>
            <h3>Instant Booking</h3>
            <p>Book appointments instantly with your preferred doctors. No waiting, no hassle.</p>
        </div>
        <div className={Styles.detailBoxes}>
            <div className={Styles.imageContainer}>
            <img src={require("../../assests/video-svgrepo-com.png")} width={50} alt="Quality Icon" className={Styles.icon} />
        </div>
            <h3>Video Consultations</h3>
            <p>Connect with doctors from the comfort of your home through secure video calls.</p>
        </div>
        <div className={Styles.detailBoxes}>
            <div className={Styles.imageContainer}>
            <img src={require("../../assests/shield-alt-1-svgrepo-com.png")} width={50} alt="Quality Icon" className={Styles.icon} />
        </div>
            <h3>Verified Doctors</h3>
            <p>All doctors are verified and highly qualified professionals you can trust.</p>
        </div>
         </div>
        </div>
    );
}