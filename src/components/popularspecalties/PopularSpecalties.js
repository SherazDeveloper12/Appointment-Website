import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpecialties } from '../../features/slices/specialties';
import styles from './popularspecalties.module.css';
import { useNavigate } from 'react-router-dom';
import { fetchDoctorsBySpecialty } from '../../features/slices/doctors'; // Import fetchDoctorsBySpecialty

export default function PopularSpecalties() {
  const dispatch = useDispatch();
  const specialties = useSelector((state) => state.specialties.specialties);
  const loading = useSelector((state) => state.specialties.loading);
  const error = useSelector((state) => state.specialties.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllSpecialties());
  }, [dispatch]);

  // Filter specialties to exclude Dermatology and limit to 6
  const popularSpecialties = specialties
    .filter((specialty) => specialty.Name !== 'Dermatology')
    .slice(0, 6);

  const handleFindSpecialists = (specialty) => {
    dispatch(fetchDoctorsBySpecialty(specialty.DoctorsIncluded)); // Fetch filtered doctors
        navigate('/find-doctors');}

  return (
    <div className={styles.popularContainer}>
     <div className={styles.popularContainerHeading}>
        <h2>Popular Specialties</h2>
        <p>Find doctors by their specialization</p>
        <img src={require("../../assests/horizontal-rule-svgrepo-com.png")}  alt="underline" />
       </div>
       <div className={styles.popularContainercontent}>
      {loading && <p className={styles.loading}>Loading popular specialties...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {popularSpecialties.length === 0 && !loading && !error && <p className={styles.noData}>No popular specialties found.</p>}
      <div className={styles.specialtiesList}>
        {popularSpecialties.map((specialty) => (
          <div key={specialty.id} className={styles.specialtyCard} onClick={() => handleFindSpecialists(specialty)}>
            <div className={styles.coverImage} style={{ backgroundImage: `url(${specialty.CoverImageUrl})` }}></div>
            <div className={styles.content}>
              <h2 className={styles.specialtyName}>{specialty.Name}</h2>
              <p className={styles.description}>{specialty.Description}</p>
              <p className={styles.findSpecialists}>Find Specialists</p>
            </div>
          </div>
        ))}
      </div>
      </div>
    </div>
  );
}