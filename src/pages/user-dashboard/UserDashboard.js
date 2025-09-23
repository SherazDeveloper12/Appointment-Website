import Styles from './userdashboard.module.css';
import { useState } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import UserProfile from '../../components/userprofile/UserProfile';
import UserAppointment from '../../components/user-appointments/UserAppointment';

export default function UserDashboard() {
  const [showProfile, setShowProfile] = useState(false);
  const [showAppointment, setShowAppointment] = useState(true);
  const [showHealthRecord, setShowHealthRecord] = useState(false);
  const [showNotifcations, setShowNotifications] = useState(false);

  const toggleProfile = () => {
    setShowProfile(!showProfile);
    setShowAppointment(false);  
    setShowHealthRecord(false);
    setShowNotifications(false);
  };

  const toggleAppointment = () => {
    setShowAppointment(!showAppointment);
    setShowProfile(false);  
    setShowHealthRecord(false);
    setShowNotifications(false);
  };
  const toggleHealthRecord = () => {
    setShowHealthRecord(!showHealthRecord);
    setShowAppointment(false);  
    setShowProfile(false);
    setShowNotifications(false);
  };
  const toggleNotifcations = () => {
    setShowNotifications(!showNotifcations);
    setShowAppointment(false);  
    setShowProfile(false);
    setShowHealthRecord(false);
  };

  return (
    <div className={Styles.container}>
      <Header />
      <div className={Styles.mainContent}> 
        <div className={Styles.mainContentHeader}>
          <h1 className={Styles.title}>My Dashboard</h1>
          <p className={Styles.subtitle}>Manage your health and appointments</p>
        </div>
        <div className={Styles.mainContentBody}> 
         <div className={Styles.cardContainer}> 
          <div className={Styles.cardContainerImage}>
          <img src={require('../../assests/calendar-svgrepo-com.png')} alt="calendar" width={25}/></div>
          <div className={Styles.cardContent}>
            <h2 className={Styles.cardTitle}>0</h2>
            <p className={Styles.cardDescription}>Upcoming</p>
          </div>
         </div>
         <div className={Styles.cardContainer}> 
           <div className={Styles.cardContainerImage}>
          <img src={require('../../assests/clock-counter-clockwise-fill-svgrepo-com.png')} alt="calendar" width={25}/></div>
          <div className={Styles.cardContent}>
            <h2 className={Styles.cardTitle}>0</h2>
            <p className={Styles.cardDescription}>Completed</p>
          </div>
         </div>
         <div className={Styles.cardContainer}> 
           <div className={Styles.cardContainerImage}>
          <img src={require('../../assests/star-svgrepo-com.png')} alt="calendar" width={25}/></div>
          <div className={Styles.cardContent}>
            <h2 className={Styles.cardTitle}>0</h2>
            <p className={Styles.cardDescription}>Avg Rating</p>
          </div>
         </div>
       
        </div>
      </div>
      <nav className={Styles.navbar}>
       
          <div className={Styles.navButtons}>
              <button
              onClick={toggleAppointment}
              className={`${Styles.navButton} ${showAppointment ? Styles.active : ''}`}
            >
              Appointments
            </button>
            <button
              onClick={toggleHealthRecord}
              className={`${Styles.navButton} ${showHealthRecord ? Styles.active : ''}`}
            >
              Health Records
            </button>
            <button
              onClick={toggleProfile}
              className={`${Styles.navButton} ${showProfile ? Styles.active : ''}`}
            >
              User Profile
            </button>
            <button
              onClick={toggleNotifcations}
              className={`${Styles.navButton} ${showNotifcations ? Styles.active : ''}`}
            >
             Notifications
            </button>
          
          </div>
       
      </nav>
      {showProfile && <UserProfile />}
      {showAppointment && <UserAppointment />}
      {showHealthRecord && <div className={Styles.Upcoming}><h1>Health Recordings are upcoming</h1></div>}
      {showNotifcations && <div className={Styles.Upcoming}><h1>Notifications are upcoming</h1></div>}
      
      <Footer />
    </div>
  );
}