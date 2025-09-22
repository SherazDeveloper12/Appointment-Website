import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllSpecialties } from '../../features/slices/specialties';
import styles from './specalitiesgrid.module.css'; 
import { useNavigate } from 'react-router-dom';

export default function SpecialtiesGrid() {
  const dispatch = useDispatch();
  const specialties = useSelector((state) => state.specialties.specialties);
  const loading = useSelector((state) => state.specialties.loading);
  const error = useSelector((state) => state.specialties.error);
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(fetchAllSpecialties());
  }, [dispatch]);

  console.log('Specialties wala data =>', specialties);

  const handleFindDoctors = (specialtyName) => {
    navigate('/find-doctors', { state: { selectedSpecialty: specialtyName } });
  };

  return (
    <div className={styles.gridContainer}>
      {loading && <p className={styles.loading}>Loading specialties...</p>}
      {error && <p className={styles.error}>Error: {error}</p>}
      {specialties.length === 0 && !loading && !error && <p className={styles.noData}>No specialties found.</p>}
      {specialties.map((specialty) => (
        <div key={specialty.id} className={styles.specialtyCard}>
            <div className={styles.cardheader} >
                <div className={styles.icondiv}>       
                     <img src={specialty.IconUrl} alt={specialty.Name} className={styles.icon} />
                </div>
                <div className={styles.headingAndDescDev}>
                    <h2 className={styles.specialtyName}>{specialty.Name}</h2>
          <p className={styles.description}>{specialty.Description}</p>
                </div>
   
          
          </div>
          <div className={styles.stats}>
            <span className={styles.doctorCount}>
                 <span> <img src={require("../../assests/gray-users-svgrepo-com (1).png")} width={15}/></span>
             <span>{specialty.Doctors} Doctors</span> 
            </span>
            <span className={styles.rating}>
                <span> <img src={require("../../assests/golden-badge-svgrepo-com.png")} width={15}/></span>
               <span> {specialty.Rating} </span>
            </span>
          </div>
          <button
            className={styles.findButton}
            onClick={() => handleFindDoctors(specialty.Name)}
          >
            Find {specialty.Name} Doctors
          </button>
        </div>
      ))}
    </div>
  );
}