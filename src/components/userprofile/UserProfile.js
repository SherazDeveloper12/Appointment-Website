import Styles from './userprofile.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { useState, useRef } from 'react';
import { updateUserProfile } from '../../features/slices/authslice';

export default function UserProfile() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth.User) || {}; // Default empty object
  const [isEditing, setIsEditing] = useState(false); // Edit mode state
  const [editedUser, setEditedUser] = useState({
    ...user, // Initialize with all user fields
    img: user.img || '', // Image URL or filename
    gender: user.gender || 'N/A', // Default to 'N/A' or existing value
  }); // Edited data state
  const fileInputRef = useRef(null); // Ref for file input

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type } = e.target;
    if (type === 'radio') {
      setEditedUser((prev) => ({ ...prev, [name]: value }));
    } else {
      setEditedUser((prev) => ({ ...prev, [name]: value || null }));
    }
  };

  // Handle image upload
  const handleImageClick = () => {
    if (isEditing) {
      fileInputRef.current.click(); // Trigger file input
    }
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    // Show instant preview with temporary URL
    const temporaryUrl = URL.createObjectURL(file);
    setEditedUser((prev) => ({ ...prev, img: temporaryUrl }));

    // Upload to Cloudinary
    const data = new FormData();
    data.append("file", file);
    data.append("upload_preset", "image_uploader_preset");
    data.append("cloud_name", "dcli1vwir");
    try {
      const response = await fetch("https://api.cloudinary.com/v1_1/dcli1vwir/image/upload", {
        method: "post",
        body: data,
      });
      const jsonResponse = await response.json();
      const url = jsonResponse.url;
      console.log("img url is ", url);

      // Update with final Cloudinary URL
      setEditedUser((prev) => ({ ...prev, img: url }));
    } catch (error) {
      console.error("Error uploading image:", error);
      // Revert to original image if upload fails
      setEditedUser((prev) => ({ ...prev, img: user.img || '' }));
    }
  };

  // Save changes
  const handleSave = async () => {
    const updatedUserData = {
      name: editedUser.name || null,
      email: editedUser.email || null,
      phone: editedUser.phone || null,
      alternatePhone: editedUser.alternatePhone || null,
      gender: editedUser.gender || null, // Convert 'N/A' to null
      age: editedUser.age || null,
      address: editedUser.address || null,
      img: editedUser.img || null,
      uid: user.uid || null,
    };
    console.log("Updated user data:", updatedUserData);

    dispatch(updateUserProfile(updatedUserData));

    setIsEditing(false); // Exit edit mode
  };

  // Cancel editing
  const handleCancel = () => {
    setEditedUser(user); // Revert to original data
    setIsEditing(false); // Exit edit mode
  };

  return (
    <div className={Styles.UserProfile}>
      <div className={Styles.UserProfileContainer}>
        <div className={Styles.Header}>
          <p>Personal Information</p>
          {!isEditing && (
            <button className={Styles.EditButton} onClick={() => setIsEditing(true)}>
              Edit Profile
            </button>
          )}
        </div>
        <div className={Styles.ImgDetailContainer}>
          <div className={Styles.ImgContainer} onClick={handleImageClick}>
            <img
              src={editedUser.img || require("../../assests/user-single-gray.png")}
              alt="Profile"
            />
            {isEditing && (
              <>
                <div className={Styles.uploadOverlay}>Upload New</div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  style={{ display: 'none' }}
                  accept="image/*"
                />
              </>
            )}
          </div>
          <div className={Styles.NameEmail}>
            <h3>{user.name || 'N/A'}</h3>
            <p>{user.email || 'N/A'}</p>
          </div>
        </div>
        <div className={Styles.NameEmailContainer}>
          <label className={Styles.Label}>Full Name</label>
          <input
            type="text"
            className={Styles.Input}
            name="name"
            value={editedUser.name || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <label className={Styles.Label}>Email</label>
          <input
            type="email"
            className={Styles.Input}
            name="email"
            value={editedUser.email || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className={Styles.PhoneNumbersContainer}>
          <label className={Styles.Label}>Phone Number</label>
          <input
            type="tel"
            className={Styles.Input}
            name="phone"
            value={editedUser.phone || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
          <label className={Styles.Label}>Alternate Phone</label>
          <input
            type="tel"
            className={Styles.Input}
            name="alternatePhone"
            value={editedUser.alternatePhone || ''}
            onChange={handleChange}
            disabled={!isEditing}
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
                checked={editedUser.gender === 'Male'}
                onChange={handleChange}
                disabled={!isEditing}
              />
              Male
            </label>
            <label>
              <input
                type="radio"
                name="gender"
                value="Female"
                checked={editedUser.gender === 'Female'}
                onChange={handleChange}
                disabled={!isEditing}
              />
              Female
            </label>
          </div>
          <label className={Styles.Label}>Age</label>
          <input
            type="number"
            className={Styles.Input}
            name="age"
            value={editedUser.age || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className={Styles.AddressContainer}>
          <label className={Styles.Label}>Address</label>
          <textarea
            className={Styles.Textarea}
            name="address"
            value={editedUser.address || ''}
            onChange={handleChange}
            disabled={!isEditing}
          />
        </div>
        <div className={Styles.Controls}>
          {isEditing && (
            <>
              <button className={Styles.SaveButton} onClick={handleSave} disabled={!isEditing}>
                Save Changes
              </button>
              <button className={Styles.CancelButton} onClick={handleCancel}>
                Cancel
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}