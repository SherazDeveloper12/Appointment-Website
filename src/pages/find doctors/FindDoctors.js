// src/components/find-doctors/FindDoctors.js
import styles from './finddoctors.module.css';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import { useEffect, useState, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchAllDoctors, setSelectedDoctor } from '../../features/slices/doctors';
import { useNavigate } from 'react-router-dom';

export default function FindDoctors() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const doctors = useSelector((state) => state.doctors.doctors);
  const filteredDoctors = useSelector((state) => state.doctors.filteredDoctors);
  const loading = useSelector((state) => state.doctors.loading);
  const error = useSelector((state) => state.doctors.error);
  
  // Local state for search and filtering
  const [searchTerm, setSearchTerm] = useState('');
  const [sortBy, setSortBy] = useState('name'); // name, rating, experience, charges
  const [sortOrder, setSortOrder] = useState('asc'); // asc, desc
  const [selectedSpecialty, setSelectedSpecialty] = useState('all');
  const [minRating, setMinRating] = useState(0);
  const [maxCharges, setMaxCharges] = useState(1000);
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    dispatch(fetchAllDoctors());
  }, [dispatch]);

  // Get unique specialties for filter dropdown
  const specialties = useMemo(() => {
    const allDoctors = filteredDoctors.length > 0 ? filteredDoctors : doctors;
    const uniqueSpecialties = [...new Set(allDoctors.map(doc => doc.Specialties).filter(Boolean))];
    return uniqueSpecialties.sort();
  }, [doctors, filteredDoctors]);

  // Apply local search and filtering
  const displayDoctors = useMemo(() => {
    let result = filteredDoctors.length > 0 ? filteredDoctors : doctors;
    
    // Apply search filter
    if (searchTerm) {
      result = result.filter(doctor => 
        doctor.DoctorName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.Specialties?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        doctor.City?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    
    // Apply specialty filter
    if (selectedSpecialty !== 'all') {
      result = result.filter(doctor => doctor.Specialties === selectedSpecialty);
    }
    
    // Apply rating filter
    if (minRating > 0) {
      result = result.filter(doctor => (doctor.Ratings || 0) >= minRating);
    }
    
    // Apply charges filter
    if (maxCharges < 1000) {
      result = result.filter(doctor => (doctor.Charges || 0) <= maxCharges);
    }
    
    // Apply sorting
    result.sort((a, b) => {
      let aValue, bValue;
      
      switch (sortBy) {
        case 'rating':
          aValue = a.Ratings || 0;
          bValue = b.Ratings || 0;
          break;
        case 'experience':
          aValue = parseInt(a.Experience) || 0;
          bValue = parseInt(b.Experience) || 0;
          break;
        case 'charges':
          aValue = a.Charges || 0;
          bValue = b.Charges || 0;
          break;
        case 'name':
        default:
          aValue = a.DoctorName?.toLowerCase() || '';
          bValue = b.DoctorName?.toLowerCase() || '';
      }
      
      if (sortOrder === 'desc') {
        return aValue < bValue ? 1 : -1;
      }
      return aValue > bValue ? 1 : -1;
    });
    
    return result;
  }, [doctors, filteredDoctors, searchTerm, selectedSpecialty, minRating, maxCharges, sortBy, sortOrder]);

  // Handle View Profile click
  const handleViewProfile = (doctor) => {
    dispatch(setSelectedDoctor(doctor));
    navigate('/doctorProfile');
  };

  const handleBookAppointment = (doctor) => {
    dispatch(setSelectedDoctor(doctor));
    navigate('/book-appointment');
  };

  // Handle image error
  const handleImageError = (e) => {
    e.target.src = '/default-doctor-avatar.png'; // Fallback image
  };

  // Clear all filters
  const clearFilters = () => {
    setSearchTerm('');
    setSelectedSpecialty('all');
    setMinRating(0);
    setMaxCharges(1000);
    setSortBy('name');
    setSortOrder('asc');
  };

  // Skeleton loader component
  const SkeletonCard = () => (
    <div className={styles.skeletonCard}>
      <div className={styles.skeletonContent}>
        <div className={styles.skeletonAvatar}></div>
        <div className={styles.skeletonText}>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
          <div className={styles.skeletonLine}></div>
        </div>
      </div>
    </div>
  );

  return (
    <div className={styles.FindDoctorsPage}>
      <Header />
      <div className={styles.container}>
        {/* Search and Filter Section */}
        <div className={styles.searchSection}>
          <div className={styles.searchBar}>
            <input
              type="text"
              placeholder="Search doctors by name, specialty, or city..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className={styles.searchInput}
              aria-label="Search doctors"
            />
            <button 
              onClick={() => setShowFilters(!showFilters)}
              className={styles.filterToggle}
              aria-label="Toggle filters"
            >
              🔽 Filters
            </button>
          </div>
          
          {showFilters && (
            <div className={styles.filtersPanel}>
              <div className={styles.filterRow}>
                <select 
                  value={selectedSpecialty} 
                  onChange={(e) => setSelectedSpecialty(e.target.value)}
                  className={styles.filterSelect}
                  aria-label="Filter by specialty"
                >
                  <option value="all">All Specialties</option>
                  {specialties.map(specialty => (
                    <option key={specialty} value={specialty}>{specialty}</option>
                  ))}
                </select>
                
                <select 
                  value={sortBy} 
                  onChange={(e) => setSortBy(e.target.value)}
                  className={styles.filterSelect}
                  aria-label="Sort by"
                >
                  <option value="name">Sort by Name</option>
                  <option value="rating">Sort by Rating</option>
                  <option value="experience">Sort by Experience</option>
                  <option value="charges">Sort by Charges</option>
                </select>
                
                <select 
                  value={sortOrder} 
                  onChange={(e) => setSortOrder(e.target.value)}
                  className={styles.filterSelect}
                  aria-label="Sort order"
                >
                  <option value="asc">Ascending</option>
                  <option value="desc">Descending</option>
                </select>
              </div>
              
              <div className={styles.filterRow}>
                <div className={styles.rangeFilter}>
                  <label>Min Rating: {minRating}</label>
                  <input
                    type="range"
                    min="0"
                    max="5"
                    step="0.5"
                    value={minRating}
                    onChange={(e) => setMinRating(parseFloat(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>
                
                <div className={styles.rangeFilter}>
                  <label>Max Charges: ${maxCharges}</label>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="50"
                    value={maxCharges}
                    onChange={(e) => setMaxCharges(parseInt(e.target.value))}
                    className={styles.rangeInput}
                  />
                </div>
                
                <Button
                  text="Clear Filters"
                  onClick={clearFilters}
                  className={styles.clearButton}
                  backgroundColor="#6c757d"
                  color="white"
                  border="none"
                />
              </div>
            </div>
          )}
        </div>
        {/* Loading State */}
        {loading && (
          <div className={styles.loadingContainer}>
            <p className={styles.loading}>Finding the best doctors for you...</p>
            <div className={styles.skeletonList}>
              {[...Array(3)].map((_, index) => (
                <SkeletonCard key={index} />
              ))}
            </div>
          </div>
        )}
        
        {/* Error State */}
        {error && (
          <div className={styles.errorContainer}>
            <p className={styles.error}>❌ {error}</p>
            <Button
              text="Try Again"
              onClick={() => dispatch(fetchAllDoctors())}
              backgroundColor="#007bff"
              color="white"
              border="none"
            />
          </div>
        )}
        {/* Doctors List */}
        {!loading && !error && (
          <>
            <div className={styles.resultsHeader}>
              <p className={styles.doctorsFound}>
                {displayDoctors.length} doctor{displayDoctors.length !== 1 ? 's' : ''} found
                {searchTerm && ` for "${searchTerm}"`}
              </p>
            </div>
            
            {displayDoctors.length === 0 ? (
              <div className={styles.emptyState}>
                <div className={styles.emptyIcon}>🔍</div>
                <h3>No doctors found</h3>
                <p>Try adjusting your search criteria or filters</p>
                <Button
                  text="Clear Filters"
                  onClick={clearFilters}
                  backgroundColor="#007bff"
                  color="white"
                  border="none"
                />
              </div>
            ) : (
              <div className={styles.doctorsList}>
                {displayDoctors.map((doctor) => (
                  <div key={doctor.id} className={styles.doctorCard}>
                    <div className={styles.doctorInfo}>
                      <div className={styles.leftside}>
                        <img 
                          src={doctor.DrImageUrl || '/default-doctor-avatar.png'} 
                          alt={`Dr. ${doctor.DoctorName}`}
                          className={styles.profilePic}
                          onError={handleImageError}
                          loading="lazy"
                        />
                        <div className={styles.nameandspecialty}>
                          <h2 className={styles.name}>Dr. {doctor.DoctorName}</h2>
                          <p className={styles.specialty}>{doctor.Specialties}</p>
                          <p className={styles.experience}>{doctor.Experience} years experience</p>
                          {doctor.availability && (
                            <p className={styles.availability}>
                              Available: {Array.isArray(doctor.availability) ? doctor.availability.join(', ') : doctor.availability}
                            </p>
                          )}
                        </div>
                      </div>
                      <div className={styles.additionalInfo}>
                        <span className={styles.ReviewsRating}>
                          <p className={styles.Rating}>
                            {'⭐'.repeat(Math.floor(doctor.Ratings || 0))} 
                            {doctor.Ratings || 'No rating'}
                          </p>
                          <p className={styles.reviews}>({doctor['Total Reviews'] || 0} reviews)</p>
                        </span>
                        <p className={styles.city}>📍 {doctor.City}</p>
                        {doctor.Education && (
                          <p className={styles.education}>🎓 {doctor.Education}</p>
                        )}
                      </div>
                    </div>
                    <div className={styles.rightside}>
                      <div className={styles.price}>
                        <div className={styles.priceTag}>${doctor.Charges || 'N/A'}</div>
                        <p>per consultation</p>
                      </div>
                      <div className={styles.actions}>
                        <Button
                          text="View Profile"
                          onClick={() => handleViewProfile(doctor)}
                          className={styles.viewProfileBtn}
                          backgroundColor="#fff"
                          color="#333"
                          border="1px solid #ddd"
                        />
                        <Button
                          text="Book Now"
                          onClick={() => handleBookAppointment(doctor)}
                          className={styles.bookNowBtn}
                          backgroundColor="rgb(47, 191, 167)"
                          color="white"
                          border="none"
                        />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </div>
      <Footer />
    </div>
  );
}