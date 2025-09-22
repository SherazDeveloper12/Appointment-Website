import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpecialties } from '../../features/slices/specialties';
import styles from './popularspecalties.module.css';
import { useNavigate } from 'react-router-dom';

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

  const handleFindSpecialists = (specialtyName) => {
    navigate('/find-doctors', { state: { selectedSpecialty: specialtyName } });
  };

  return (
    <div className={styles.popularContainer}>
     <div className={styles.popularContainerHeading}>
        <h2>Why Choose MediStack</h2>
        <p>Experience healthcare like never before</p>
        <img src={require("../../assests/horizontal-rule-svgrepo-com.png")}  alt="underline" />
       </div>
       <div className={styles.popularContainercontent}>
      {loading && <p className={styles.loading}>Loading popular specialties...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {popularSpecialties.length === 0 && !loading && !error && <p className={styles.noData}>No popular specialties found.</p>}
      <div className={styles.specialtiesList}>
        {popularSpecialties.map((specialty) => (
          <div key={specialty.id} className={styles.specialtyCard} onClick={() => handleFindSpecialists(specialty.Name)}>
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