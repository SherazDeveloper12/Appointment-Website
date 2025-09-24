// src/features/slices/doctorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firestore'; 

// Load selectedDoctor from localStorage on initial load
const loadSelectedDoctor = () => {
  const storedDoctor = localStorage.getItem('selectedDoctor');
  return storedDoctor ? JSON.parse(storedDoctor) : null;
};

// Thunk for fetching all doctors
export const fetchAllDoctors = createAsyncThunk('doctors/fetchAll', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Doctors'));
    const doctors = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return doctors;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Thunk for fetching filtered doctors by specialty using DoctorsIncluded
export const fetchDoctorsBySpecialty = createAsyncThunk('doctors/fetchBySpecialty', async (DoctorsIncluded) => {
  try {

    const q = query(collection(db, 'Doctors')); // Sab doctors fetch karo
    const querySnapshot = await getDocs(q);
    const doctors = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));

    // Filter doctors jinka Specialties DoctorsIncluded se match kare
    const filteredDoctors = doctors.filter(doctor =>
      doctor.Specialties === DoctorsIncluded
    );
    return filteredDoctors;
  } catch (error) {
    throw new Error(error.message);
  }
});

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [], // Saara data yahaan store hoga
    filteredDoctors: [], // Naya state for filtered doctors
    selectedDoctor: loadSelectedDoctor(), // Load from localStorage
    loading: false,
    error: null
  },
  reducers: {
    // Optional: Agar client-side filter chahiye (e.g., search query ke liye)
    filterDoctorsLocally: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredDoctors = state.doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery)
      );
    },
    // New reducer to set selected doctor
    setSelectedDoctor: (state, action) => {
      state.selectedDoctor = action.payload;
      localStorage.setItem('selectedDoctor', JSON.stringify(action.payload));
    },
    // New reducer to clear selected doctor if needed
    clearSelectedDoctor: (state) => {
      state.selectedDoctor = null;
      localStorage.removeItem('selectedDoctor');
    },
  },
  extraReducers: (builder) => {
    // Fetch All cases
    builder
      .addCase(fetchAllDoctors.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllDoctors.fulfilled, (state, action) => {
        state.loading = false;
        state.doctors = action.payload;
      })
      .addCase(fetchAllDoctors.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Fetch Filtered cases
    builder
      .addCase(fetchDoctorsBySpecialty.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDoctorsBySpecialty.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredDoctors = action.payload; // Update filteredDoctors state
      })
      .addCase(fetchDoctorsBySpecialty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Export actions
export const { filterDoctorsLocally, setSelectedDoctor, clearSelectedDoctor } = doctorsSlice.actions;

// Export reducer
export default doctorsSlice.reducer;