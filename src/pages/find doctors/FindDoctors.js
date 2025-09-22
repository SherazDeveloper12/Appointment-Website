import styles from './finddoctors.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctors } from '../../features/slices/doctors'; // Doctors slice se import

export default function FindDoctors() {
  const dispatch = useDispatch();
  const doctors = useSelector((state) => state.doctors.doctors); // Saare doctors
  const loading = useSelector((state) => state.doctors.loading);
  const error = useSelector((state) => state.doctors.error);

  useEffect(() => {
    dispatch(fetchAllDoctors()); // Saare doctors fetch karo
  }, [dispatch]);

  // Doctors ko console mein print karo
  useEffect(() => {
    if (!loading && !error) {
      console.log('All Doctors Data =>', doctors);
    }
  }, [doctors, loading, error]);

  return (
    <div className={styles.FindDoctorsPage}> 
      <Header />
    <div className={styles.container}>
   
      {loading && <p className={styles.loading}>Loading doctors...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {!loading && !error && (
        <>
          <p className={styles.doctorsFound}>{doctors.length} doctors found</p>
          <div className={styles.doctorsList}>
            {doctors.map((doctor) => (
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
                      <p className={styles.Rating}>⭐ {doctor.Ratings}
                      </p>
                      <p className={styles.reviews}>
                        ({doctor['Total Reviews']})
                      </p>
                    </span>
                    <p className={styles.city}>{doctor.City}</p>
                  </div>
                </div>
                <div className={styles.rightside}>
                  <div className={styles.price}>
                  <div className={styles.priceTag}>
                    ${doctor.Charges}</div>
                    <p>per consultation</p>
                    </div>
                  <div className={styles.actions}>
                    <button className={styles.viewProfile}>View Profile</button>
                    <button className={styles.bookNow}>Book Now</button>
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