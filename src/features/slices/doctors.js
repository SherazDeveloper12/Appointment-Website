// src/features/slices/doctorsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firestore'; 

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

// Thunk for fetching filtered doctors (specialty ke basis pe)
export const fetchDoctorsBySpecialty = createAsyncThunk('doctors/fetchBySpecialty', async (specialty) => {
  try {
    if (!specialty) {
      return []; // Agar specialty empty hai, to empty return
    }
    const q = query(collection(db, 'Doctors'), where('specialty', '==', specialty)); // Exact match specialty pe
    const querySnapshot = await getDocs(q);
    const doctors = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return doctors;
  } catch (error) {
    throw new Error(error.message);
  }
});

const doctorsSlice = createSlice({
  name: 'doctors',
  initialState: {
    doctors: [], // Saara data yahaan store hoga
    filteredDoctors: [], // Filtered data yahaan
    loading: false,
    error: null
  },
  reducers: {
    // Optional: Agar client-side filter chahiye (e.g., search query ke liye)
    filterDoctorsLocally: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredDoctors = state.doctors.filter(doctor =>
        doctor.name.toLowerCase().includes(searchQuery) // Name pe filter, tum change kar sakte ho
      );
    }
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
        state.filteredDoctors = action.payload;
      })
      .addCase(fetchDoctorsBySpecialty.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Export actions (agar local filter use karna hai)
export const { filterDoctorsLocally } = doctorsSlice.actions;

// Export reducer
export default doctorsSlice.reducer;