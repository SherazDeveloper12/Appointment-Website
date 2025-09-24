import Styles from "./featuredoctors.module.css";
import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctors ,setSelectedDoctor } from '../../features/slices/doctors'; // Doctors slice se import
import { Link } from "react-router";
import { useNavigate } from 'react-router-dom'; // For navigation

export default function FeatureDoctors() {
    const navigate = useNavigate();
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

  // Pehle 3 doctors
  const featuredDoctors = doctors.slice(0, 3);
const handleViewProfile = (doctor) => {
    dispatch(setSelectedDoctor(doctor)); // Set selected doctor in Redux state
    navigate('/doctorProfile'); // Navigate to DoctorProfile page
  };
  const handleBookAppointment = (doctor) => {
    dispatch(setSelectedDoctor(doctor)); // Set selected doctor in Redux state
    navigate('/book-appointment'); // Navigate to DoctorProfile page
  };
    
  return (
    <div className={Styles.Container}>
      <div className={Styles.Heading}>
        <h2>Featured Doctors</h2>
        <p>Top-rated doctors ready to help you</p>
        <img src={require("../../assests/horizontal-rule-svgrepo-com.png")} alt="underline" />
      </div>
      {loading && <p className={Styles.loading}>Loading doctors...</p>}
      {error && <p className={Styles.error}>Error: {error}</p>}
      {!loading && !error && featuredDoctors.length > 0 && (
        <div className={Styles.doctorsList}>
          {featuredDoctors.map((doctor) => (
            <div key={doctor.id} className={Styles.doctorCard}>
                <div className={Styles.doctorInfo}>
                    <div className={Styles.doctorImage}>
              <img src={doctor.DrImageUrl || 'default-profile.jpg'} alt={doctor.DoctorName} className={Styles.profilePic} />

                    </div>
                <div className={Styles.details}>
                  <h2 className={Styles.name}>{doctor.DoctorName}</h2>
                  <p className={Styles.specialty}>{doctor.Specialties}</p>
                </div>
              </div>
              <div className={Styles.RatingReviewsPriceContainer}>
              <div className={Styles.additionalInfo}>
                <span className={Styles.ReviewsRating}>
                      <p className={Styles.Rating}>⭐ {doctor.Ratings}
                      </p>
                      <p className={Styles.reviews}>
                        ({doctor['Total Reviews']})
                      </p>
                    </span>
              </div>
              <div className={Styles.priceTag}>
                ${doctor.Charges}

              </div>
              </div>
              <div className={Styles.experience}>
                  <p className={Styles.experienceparagraph}>{doctor.Experience} years experience</p>
                  </div>
              <div className={Styles.actions}>
             
              <button onClick={() => handleViewProfile(doctor)} className={Styles.viewProfile}>View Profile</button>
                   <button onClick={() => handleBookAppointment(doctor)} className={Styles.bookNow}>Book Now</button> 
              </div>
            </div>
          ))}
        </div>
      )}
      <Link to="/find-doctors"><button className={Styles.viewAll}>View All Doctors</button></Link>
    </div>
  );
}