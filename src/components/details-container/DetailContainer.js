import Styles from './detailsContainer.module.css';
export default function DetailContainer() {
    return (
        <div className={Styles.detailContainer}>
          <div className={Styles.detailBox}>
        <div className={Styles.imageContainer}>
            <img src={require("../../assests/users-svgrepo-com.png")} width={35} alt="Appointment Icon" className={Styles.icon} />
        </div>
            <h2>1000+</h2>
            <p>Verfied Doctors</p>
            </div>
          <div className={Styles.detailBox}>
              <div className={Styles.imageContainer}>
            <img src={require("../../assests/heart-svgrepo-com.png")} width={35} alt="Appointment Icon" className={Styles.icon} />
        </div>
            <h2>50+</h2>
            <p>Specialties</p>
            </div>
          <div className={Styles.detailBox}>
              <div className={Styles.imageContainer}>
            <img src={require("../../assests/badge-svgrepo-com.png")} width={35} alt="Appointment Icon" className={Styles.icon} />
        </div>
            <h2>100k+</h2>
            <p>Happy Patients</p>
            </div>
          <div className={Styles.detailBox}>
              <div className={Styles.imageContainer}>
            <img src={require("../../assests/shield-alt-1-svgrepo-com.png")} width={35} alt="Appointment Icon" className={Styles.icon} />
        </div>
            <h2>24/7</h2>
            <p>Support</p>
            </div>
        </div>
    );
}