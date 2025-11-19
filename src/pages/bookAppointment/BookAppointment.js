import Styles from './bookappointment.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef, useCallback } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import Button from '../../components/button/Button';
import { createAppointment } from '../../features/slices/appointmentSlice';
import { updateUserProfile } from '../../features/slices/authslice';
import { useNavigate } from 'react-router-dom';

export default function BookAppointment() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const selectedDoctor = useSelector((state) => state.doctors.selectedDoctor);
  const user = useSelector((state) => state.auth.User) || {};
  const [formData, setFormData] = useState({
    date: '',
    time: '',
    reason: '',
  });
  const [profileData, setProfileData] = useState({
    ...user,
    img: user.img || '',
    gender: user.gender || 'N/A',
  });
  const [loading, setLoading] = useState(false);
  const [isImageUploading, setIsImageUploading] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});
  const [successMessage, setSuccessMessage] = useState('');
  const fileInputRef = useRef(null);

  // Get today's date for validation
  const today = new Date().toISOString().split('T')[0];

  // Form validation functions
  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validatePhone = (phone) => {
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    return !phone || phoneRegex.test(phone.replace(/[\s\-\(\)]/g, ''));
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData.date) errors.date = 'Date is required';
    else if (formData.date < today) errors.date = 'Date cannot be in the past';
    
    if (!formData.time) errors.time = 'Time is required';
    
    if (profileData.name && profileData.name.trim().length < 2) {
      errors.name = 'Name must be at least 2 characters';
    }
    
    if (profileData.email && !validateEmail(profileData.email)) {
      errors.email = 'Please enter a valid email address';
    }
    
    if (profileData.phone && !validatePhone(profileData.phone)) {
      errors.phone = 'Please enter a valid phone number';
    }
    
    if (profileData.alternatePhone && !validatePhone(profileData.alternatePhone)) {
      errors.alternatePhone = 'Please enter a valid alternate phone number';
    }
    
    if (profileData.age && (profileData.age < 1 || profileData.age > 120)) {
      errors.age = 'Age must be between 1 and 120';
    }
    
    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleProfileChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value || null }));
    }
    // Clear field error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Validate file
    const maxSize = 5 * 1024 * 1024; // 5MB
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif'];
    
    if (!allowedTypes.includes(file.type)) {
      setError('Please upload a valid image file (JPEG, PNG, or GIF)');
      return;
    }
    
    if (file.size > maxSize) {
      setError('Image size should be less than 5MB');
      return;
    }

    setIsImageUploading(true);
    setError(null);
    const temporaryUrl = URL.createObjectURL(file);
    setProfileData((prev) => ({ ...prev, img: temporaryUrl }));

    // TODO: Move Cloudinary config to environment variables
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "image_uploader_preset");
    data.append("cloud_name", "dcli1vwir");
    
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dcli1vwir/image/upload", {
        method: "post",
        body: data,
      });
      
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error?.message || 'Image upload failed');
      }
      
      const jsonResponse = await response.json();
      setProfileData((prev) => ({ ...prev, img: jsonResponse.url }));
    } catch (uploadError) {
      console.error('Image upload error:', uploadError);
      setProfileData((prev) => ({ ...prev, img: user.img || '' }));
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsImageUploading(false);
      URL.revokeObjectURL(temporaryUrl); // Clean up memory
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Clear previous messages
    setError(null);
    setSuccessMessage('');
    
    if (isImageUploading) {
      setError('Please wait until the image upload is complete.');
      return;
    }
    
    // Validate form
    if (!validateForm()) {
      setError('Please fix the errors above and try again.');
      return;
    }
    
    setLoading(true);

    try {
      const updatedUserData = {
        name: profileData.name?.trim() || null,
        email: profileData.email?.trim() || null,
        phone: profileData.phone?.trim() || null,
        alternatePhone: profileData.alternatePhone?.trim() || null,
        gender: profileData.gender === 'N/A' ? null : profileData.gender,
        age: profileData.age ? parseInt(profileData.age) : null,
        address: profileData.address?.trim() || null,
        img: profileData.img || null,
        uid: user.uid || null,
      };

      // Only update profile if there are changes
      const hasProfileChanges = Object.keys(updatedUserData).some(
        key => updatedUserData[key] !== user[key]
      );
      
      if (hasProfileChanges) {
        await dispatch(updateUserProfile(updatedUserData)).unwrap();
      }

      // Create appointment
      await dispatch(createAppointment({
        userId: user.uid,
        doctorId: selectedDoctor.id,
        date: formData.date,
        time: formData.time,
        status: 'upcoming',
        reason: formData.reason?.trim() || '',
        createdAt: new Date(),
        DrImageUrl: selectedDoctor.DrImageUrl,
        DoctorName: selectedDoctor.DoctorName,
        DoctorRatings: selectedDoctor.Ratings,
        Specialties: selectedDoctor.Specialties,
      })).unwrap();
       
      setSuccessMessage('Appointment booked successfully! Redirecting...');
      
      // Redirect after showing success message
      setTimeout(() => {
        navigate('/profile');
      }, 2000);
      
    } catch (err) {
      console.error('Booking error:', err);
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

 

  if (!selectedDoctor || !user.uid) {
    return (
      <div className={Styles.BookAppointment}>
        <Header />
        <div className={Styles.container}>
          <div className={Styles.loadingContainer}>
            <p>Loading appointment details...</p>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className={Styles.BookAppointment}>
      <Header />
      <div className={Styles.container}>
        <h1>Book Appointment</h1>
        <div className={Styles.doctorInfo}>
          <div className={Styles.doctorImage}>
            <img src={selectedDoctor.DrImageUrl} alt={selectedDoctor.DoctorName} />
          </div>
          <div className={Styles.doctorDetails}>
            <h2>Doctor: {selectedDoctor.DoctorName}</h2>
            <p>Specialty: {selectedDoctor.Specialties}</p>
            <p>City: {selectedDoctor.City}</p>
            <p>Availability: {selectedDoctor.availability?.join(', ') || 'Not specified'}</p>
          </div>
        </div>
        <div className={Styles.UserProfile}>
          <div className={Styles.UserProfileContainer}>
            <div className={Styles.Header}>
              <p>Personal Information</p>
            </div>
            <div className={Styles.ImgDetailContainer}>
              <div className={Styles.ImgContainer} onClick={handleImageClick}>
                <img
                  src={profileData.img || require("../../assests/user-single-gray.png")}
                  alt="Profile"
                />
                <div className={Styles.uploadOverlay}>Upload New</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </div>
              <div className={Styles.NameEmail}>
                <h3>{profileData.name || 'N/A'}</h3>
                <p>{profileData.email || 'N/A'}</p>
              </div>
            </div>
            <div className={Styles.NameEmailContainer}>
              <label className={Styles.Label}>Full Name</label>
              <input
                type="text"
                className={`${Styles.Input} ${fieldErrors.name ? Styles.inputError : ''}`}
                name="name"
                value={profileData.name || ''}
                onChange={handleProfileChange}
                aria-describedby={fieldErrors.name ? 'name-error' : undefined}
              />
              {fieldErrors.name && <span id="name-error" className={Styles.fieldError}>{fieldErrors.name}</span>}
              
              <label className={Styles.Label}>Email</label>
              <input
                type="email"
                className={`${Styles.Input} ${fieldErrors.email ? Styles.inputError : ''}`}
                name="email"
                value={profileData.email || ''}
                onChange={handleProfileChange}
                aria-describedby={fieldErrors.email ? 'email-error' : undefined}
              />
              {fieldErrors.email && <span id="email-error" className={Styles.fieldError}>{fieldErrors.email}</span>}
            </div>
            <div className={Styles.PhoneNumbersContainer}>
              <label className={Styles.Label}>Phone Number</label>
              <input
                type="tel"
                className={`${Styles.Input} ${fieldErrors.phone ? Styles.inputError : ''}`}
                name="phone"
                value={profileData.phone || ''}
                onChange={handleProfileChange}
                aria-describedby={fieldErrors.phone ? 'phone-error' : undefined}
              />
              {fieldErrors.phone && <span id="phone-error" className={Styles.fieldError}>{fieldErrors.phone}</span>}
              
              <label className={Styles.Label}>Alternate Phone</label>
              <input
                type="tel"
                className={`${Styles.Input} ${fieldErrors.alternatePhone ? Styles.inputError : ''}`}
                name="alternatePhone"
                value={profileData.alternatePhone || ''}
                onChange={handleProfileChange}
                aria-describedby={fieldErrors.alternatePhone ? 'alternate-phone-error' : undefined}
              />
              {fieldErrors.alternatePhone && <span id="alternate-phone-error" className={Styles.fieldError}>{fieldErrors.alternatePhone}</span>}
            </div>
            <div className={Styles.GenderAgeContainer}>
              <label className={Styles.Label}>Gender</label>
              <div className={Styles.RadioGroup}>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Male"
                    checked={profileData.gender === 'Male'}
                    onChange={handleProfileChange}
                  />
                  Male
                </label>
                <label>
                  <input
                    type="radio"
                    name="gender"
                    value="Female"
                    checked={profileData.gender === 'Female'}
                    onChange={handleProfileChange}
                  />
                  Female
                </label>
              </div>
              <label className={Styles.Label}>Age</label>
              <input
                type="number"
                className={`${Styles.Input} ${fieldErrors.age ? Styles.inputError : ''}`}
                name="age"
                value={profileData.age || ''}
                onChange={handleProfileChange}
                min="1"
                max="120"
                aria-describedby={fieldErrors.age ? 'age-error' : undefined}
              />
              {fieldErrors.age && <span id="age-error" className={Styles.fieldError}>{fieldErrors.age}</span>}
            </div>
            <div className={Styles.AddressContainer}>
              <label className={Styles.Label}>Address</label>
              <textarea
                className={Styles.Textarea}
                name="address"
                value={profileData.address || ''}
                onChange={handleProfileChange}
              />
            </div>
          </div>
        </div>
        <form onSubmit={handleSubmit} className={Styles.appointmentForm}>
          <div className={Styles.formGroup}>
            <label htmlFor="appointment-date">Date *</label>
            <input
              id="appointment-date"
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              min={today}
              className={fieldErrors.date ? Styles.inputError : ''}
              aria-describedby={fieldErrors.date ? 'date-error' : undefined}
              required
            />
            {fieldErrors.date && <span id="date-error" className={Styles.fieldError}>{fieldErrors.date}</span>}
          </div>
          
          <div className={Styles.formGroup}>
            <label htmlFor="appointment-time">Time *</label>
            <input
              id="appointment-time"
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className={fieldErrors.time ? Styles.inputError : ''}
              aria-describedby={fieldErrors.time ? 'time-error' : undefined}
              required
            />
            {fieldErrors.time && <span id="time-error" className={Styles.fieldError}>{fieldErrors.time}</span>}
          </div>
          
          <div className={Styles.formGroup}>
            <label htmlFor="appointment-reason">Reason for Visit</label>
            <textarea
              id="appointment-reason"
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason for your appointment"
              rows="3"
            />
          </div>
          
          {error && <div className={Styles.error} role="alert">{error}</div>}
          {successMessage && <div className={Styles.success} role="alert">{successMessage}</div>}
          
          <div className={Styles.buttonContainer}>
            <Button
              text={loading ? 'Booking...' : isImageUploading ? 'Uploading Image...' : 'Book Appointment'}
              onClick={handleSubmit}
              className={Styles.BookAppointmentbutton}
              backgroundColor={loading || isImageUploading ? '#ccc' : '#007bff'}
              color="white"
              border="none"
            />
          </div>
        </form>
      </div>
      <Footer />
    </div>
  );
}