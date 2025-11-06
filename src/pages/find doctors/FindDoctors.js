// src/components/find-doctors/FindDoctors.js
import styles from './finddoctors.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctors, setSelectedDoctor } from '../../features/slices/doctors';
import { useNavigate } from 'react-router-dom';

export default function FindDoctors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors); // All doctors
  const filteredDoctors = useSelector((state) => state.doctors.filteredDoctors); // Filtered doctors
  const loading = useSelector((state) => state.doctors.loading);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    dispatch(fetchAllDoctors()); // Default fetch all doctors (filtered already handled by slice)
  }, [dispatch]);

  // Doctors ko console mein print karo
  useEffect(() => {
    if (!loading && !error) {
     }
  }, [doctors, filteredDoctors, loading, error]);

  // Handle View Profile click
  const handleViewProfile = (doctor) => {
    dispatch(setSelectedDoctor(doctor));
    navigate('/doctorProfile');
  };

  const handleBookAppointment = (doctor) => {
    dispatch(setSelectedDoctor(doctor));
    navigate('/book-appointment');
  };

  // Use filteredDoctors if available, otherwise use doctors
  const displayDoctors = filteredDoctors.length > 0 ? filteredDoctors : doctors;

  return (
    <div className={styles.FindDoctorsPage}>
      <Header />
      <div className={styles.container}>
        {loading && <p className={styles.loading}>Loading doctors...</p>}
        {error && <p className={styles.error}>Error: {error}</p>}
        {!loading && !error && (
          <>
            <p className={styles.doctorsFound}>{displayDoctors.length} doctors found</p>
            <div className={styles.doctorsList}>
              {displayDoctors.map((doctor) => (
                <div key={doctor.id} className={styles.doctorCard}>
                  <div className={styles.doctorInfo}>
                    <div className={styles.leftside}>
                      <img src={doctor.DrImageUrl || 'default-profile.jpg'} alt={doctor.DoctorName} className={styles.profilePic} />
                      <div className={styles.nameandspecialty}>
                        <h2 className={styles.name}>{doctor.DoctorName}</h2>
                        <p className={styles.specialty}>{doctor.Specialties}</p>
                        <p className={styles.experience}>{doctor.Experience} years experience</p>
                      </div>
                    </div>
                    <div className={styles.additionalInfo}>
                      <span className={styles.ReviewsRating}>
                        <p className={styles.Rating}>⭐ {doctor.Ratings}</p>
                        <p className={styles.reviews}>({doctor['Total Reviews']})</p>
                      </span>
                      <p className={styles.city}>{doctor.City}</p>
                    </div>
                  </div>
                  <div className={styles.rightside}>
                    <div className={styles.price}>
                      <div className={styles.priceTag}>${doctor.Charges}</div>
                      <p>per consultation</p>
                    </div>
                    <div className={styles.actions}>
                      <button onClick={() => handleViewProfile(doctor)} className={styles.viewProfile}>View Profile</button>
                      <button onClick={() => handleBookAppointment(doctor)} className={styles.bookNow}>Book Now</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}