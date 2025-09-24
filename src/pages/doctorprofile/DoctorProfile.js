import { useSelector,useDispatch,  } from 'react-redux';
import Styles from './doctorprofile.module.css'
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation

import { setSelectedDoctor } from '../../features/slices/doctors';

export default function DoctorProfile() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const selectedDoctor = useSelector((state) => state.doctors.selectedDoctor);
  const [showReviews, setshowReviews] = useState(false);
  const [showAbout, setshowAbout] = useState(true);
  const [showExperience, setshowExperience] = useState(false);
  const [showAvailability, setshowAvailability] = useState(false);
  if (!selectedDoctor) {
    return <div>No doctor selected</div>;
  }
 const handleBookAppointment = (doctor) => {
    dispatch(setSelectedDoctor(doctor)); // Set selected doctor in Redux state
    navigate('/book-appointment'); // Navigate to DoctorProfile page
  };

  const toggleProfile = () => {
    setshowReviews(!showReviews);
    setshowAbout(false);  
    setshowExperience(false);
    setshowAvailability(false);
  };

  const toggleAppointment = () => {
    setshowAbout(!showAbout);
    setshowReviews(false);  
    setshowExperience(false);
    setshowAvailability(false);
  };
  const toggleHealthRecord = () => {
    setshowExperience(!showExperience);
    setshowAbout(false);  
    setshowReviews(false);
    setshowAvailability(false);
  };
  const toggleNotifcations = () => {
    setshowAvailability(!showAvailability);
    setshowAbout(false);  
    setshowReviews(false);
    setshowExperience(false);
  };
  return (
    <div className={Styles.DoctorProfile}> 
      <Header />
      <div className={Styles.DoctorProfileMainContainer}>
      <div className={Styles.mainContent}> 
        <div className={Styles.mainContentHeader}>
          <div className={Styles.profileImage}>
          <img src={selectedDoctor.DrImageUrl} alt="Doctor" />
          </div>
          <div className={Styles.profileDetails}>
          <h1 className={Styles.title}>{selectedDoctor.DoctorName}</h1>
          <p className={Styles.subtitle}>{selectedDoctor.Specialties}</p>
          <div className={Styles.RatingsReviewsCity}>
            <div className={Styles.RatingsReviews}>
          <p className={Styles.Ratings}>⭐ {selectedDoctor.Ratings}
          </p>
          <p className={Styles.Reviews}> ({selectedDoctor['Total Reviews']} Reviews)</p>
          </div>
          <div className={Styles.City}>
            <img src={require('../../assests/location-gray.png')} alt="location" width={25}/>
            <p className={Styles.City}>{selectedDoctor.City}</p>
          </div>
          
          </div>
          </div>
        </div>
        <div className={Styles.mainContentBody}> 
         <div className={Styles.MaincardContainer}> 
          <div className={Styles.DoctorChargesCont}>
          <p>In-Person Consultation</p>
          <p className={Styles.DoctorCharges}>${selectedDoctor.Charges}</p>
          </div>
          <div className={Styles.Actions}>
           <button onClick={() => handleBookAppointment(selectedDoctor)} className={Styles.BookAppointment}>Book Appointment</button>
          </div>
         </div>
         <div className={Styles.SecondaryCardContainer}>
          
         <div className={Styles.cardContainer}> 
           <div className={Styles.cardContainerImage}>
          <img src={require('../../assests/users-svgrepo-com.png')} alt="calendar" width={25}/></div>
          <div className={Styles.cardContent}>
            <h2 className={Styles.cardTitle}>2000+</h2>
            <p className={Styles.cardDescription}>Patients Treated</p>
          </div>
         </div>
         <div className={Styles.cardContainer}> 
           <div className={Styles.cardContainerImage}>
          <img src={require('../../assests/clock-svgrepo-com (1).png')} alt="calendar" width={25}/></div>
          <div className={Styles.cardContent}>
            <h2 className={Styles.cardTitle}>{selectedDoctor.Experience} years</h2>
            <p className={Styles.cardDescription}>Experience</p>
          </div>
         </div>
         
       </div>
        </div>
      </div>
      <nav className={Styles.navbar}>
       
          <div className={Styles.navButtons}>
              <button
              onClick={toggleAppointment}
              className={`${Styles.navButton} ${showAbout ? Styles.active : ''}`}
            >
              About
            </button>
            <button
              onClick={toggleHealthRecord}
              className={`${Styles.navButton} ${showExperience ? Styles.active : ''}`}
            >
              Experience
            </button>
            <button
              onClick={toggleProfile}
              className={`${Styles.navButton} ${showReviews ? Styles.active : ''}`}
            >
              Reviews
            </button>
            <button
              onClick={toggleNotifcations}
              className={`${Styles.navButton} ${showAvailability ? Styles.active : ''}`}
            >
             Availability
            </button>
          
          </div>
       
      </nav>
       {showAbout && <div className={Styles.Upcoming}><h1>About Section are upcoming</h1></div>}
      {showExperience && <div className={Styles.Upcoming}><h1>Experience are upcoming</h1></div>}
      {showReviews && <div className={Styles.Upcoming}><h1>Reviews are upcoming</h1></div>}
      {showAvailability && <div className={Styles.Upcoming}><h1>Availability are upcoming</h1></div>}
    </div>
    <Footer />
    </div>
  );
}