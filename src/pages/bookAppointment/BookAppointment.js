import Styles from './bookappointment.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useEffect, useRef } from 'react';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { createAppointment } from '../../features/slices/appointmentSlice';
import { updateUserProfile } from '../../features/slices/authslice';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

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
  const fileInputRef = useRef(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleProfileChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setProfileData((prev) => ({ ...prev, [name]: value }));
    } else {
      setProfileData((prev) => ({ ...prev, [name]: value || null }));
    }
  };

  const handleImageClick = () => {
    fileInputRef.current.click();
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    setIsImageUploading(true);
    const temporaryUrl = URL.createObjectURL(file);
    setProfileData((prev) => ({ ...prev, img: temporaryUrl }));

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
        throw new Error('Image upload failed');
      }
      const jsonResponse = await response.json();
      const url = jsonResponse.url;
      setProfileData((prev) => ({ ...prev, img: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      setProfileData((prev) => ({ ...prev, img: user.img || '' }));
      setError('Failed to upload image. Please try again.');
    } finally {
      setIsImageUploading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isImageUploading) {
      setError('Please wait until the image upload is complete.');
      return;
    }
    setLoading(true);
    setError(null);

    try {
      console.log('Starting profile update...');
      const updatedUserData = {
        name: profileData.name || null,
        email: profileData.email || null,
        phone: profileData.phone || null,
        alternatePhone: profileData.alternatePhone || null,
        gender: profileData.gender === 'N/A' ? null : profileData.gender,
        age: profileData.age || null,
        address: profileData.address || null,
        img: profileData.img || null,
        uid: user.uid || null,
      };

      if (JSON.stringify(user) !== JSON.stringify({ ...user, ...updatedUserData })) {
        console.log('Updating profile with:', updatedUserData);
        await dispatch(updateUserProfile(updatedUserData)).unwrap();
        console.log('Profile updated successfully');
      } else {
        console.log('No profile changes detected');
      }

      console.log('Creating appointment with:', {
        userId: user.uid,
        doctorId: selectedDoctor.id,
        date: formData.date,
        time: formData.time,
        status: 'upcoming',
        reason: formData.reason,
        createdAt: new Date(),
        DrImageUrl: selectedDoctor.DrImageUrl,
        DoctorName: selectedDoctor.DoctorName,
        DoctorRatings: selectedDoctor.Ratings,
        Specialties: selectedDoctor.Specialties,
      });

      await dispatch(createAppointment({
        userId: user.uid,
        doctorId: selectedDoctor.id,
        date: formData.date,
        time: formData.time,
        status: 'upcoming',
        reason: formData.reason,
        createdAt: new Date(),
        DrImageUrl: selectedDoctor.DrImageUrl,
        DoctorName: selectedDoctor.DoctorName,
        DoctorRatings: selectedDoctor.Ratings,
        Specialties: selectedDoctor.Specialties,
      })).unwrap();
      console.log('Appointment booked successfully');
      navigate('/profile');
    } catch (err) {
      console.error('Submission error:', err);
      setError(err.message || 'Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
      console.log('Submission complete, loading set to false');
    }
  };

 

  if (!selectedDoctor || !user.uid) {
    return <div>Loading...</div>;
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
                className={Styles.Input}
                name="name"
                value={profileData.name || ''}
                onChange={handleProfileChange}
              />
              <label className={Styles.Label}>Email</label>
              <input
                type="email"
                className={Styles.Input}
                name="email"
                value={profileData.email || ''}
                onChange={handleProfileChange}
              />
            </div>
            <div className={Styles.PhoneNumbersContainer}>
              <label className={Styles.Label}>Phone Number</label>
              <input
                type="tel"
                className={Styles.Input}
                name="phone"
                value={profileData.phone || ''}
                onChange={handleProfileChange}
              />
              <label className={Styles.Label}>Alternate Phone</label>
              <input
                type="tel"
                className={Styles.Input}
                name="alternatePhone"
                value={profileData.alternatePhone || ''}
                onChange={handleProfileChange}
              />
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
                className={Styles.Input}
                name="age"
                value={profileData.age || ''}
                onChange={handleProfileChange}
              />
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
            <label>Date</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Time</label>
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              required
            />
          </div>
          <div className={Styles.formGroup}>
            <label>Reason for Visit</label>
            <textarea
              name="reason"
              value={formData.reason}
              onChange={handleChange}
              placeholder="Enter reason for your appointment"
            />
          </div> 
          {error && <p className={Styles.error}>{error}</p>}
          <button className={Styles.BookAppointmentbutton} type="submit" disabled={loading || isImageUploading}>
            {loading ? 'Booking...' : isImageUploading ? 'Uploading Image...' : 'Book Appointment'}
          </button> 
        </form>
      </div>
      <Footer />
    </div>
  );
}