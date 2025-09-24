// src/features/slices/appointmentsSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, addDoc, getDocs, query, where, doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firestore';

// Thunk to create a new appointment
export const createAppointment = createAsyncThunk('appointments/create', async (appointmentData) => {
  try {
    const docRef = await addDoc(collection(db, 'appointments'), appointmentData);
    const appointmentWithId = { id: docRef.id, ...appointmentData }; // Add id to the data
    await updateDoc(docRef, appointmentWithId); // Update the document with id
    return appointmentWithId; // Return the complete object with id
  } catch (error) {
    throw new Error(error.message);
  }
});

// Thunk to fetch user's appointments
export const fetchUserAppointments = createAsyncThunk('appointments/fetchUser', async (userId) => {
  try {
    const q = query(collection(db, 'appointments'), where('userId', '==', userId));
    const querySnapshot = await getDocs(q);
    const appointments = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return appointments;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Thunk to complete an appointment by ID
export const completeAppointment = createAsyncThunk('appointments/complete', async (appointmentId) => {
  try {
    const appointmentRef = doc(db, 'appointments', appointmentId);
    await updateDoc(appointmentRef, { status: 'completed' });
    return appointmentId; // Return the ID of the completed appointment
  } catch (error) {
    throw new Error(error.message);
  }
});

const appointmentsSlice = createSlice({
  name: 'appointments',
  initialState: {
    appointments: [], // Store all appointments for the user
    loading: false,
    error: null
  },
  reducers: {},
  extraReducers: (builder) => {
    // Create Appointment cases
    builder
      .addCase(createAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createAppointment.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments.push(action.payload); // Add new appointment with id
      })
      .addCase(createAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Fetch User Appointments cases
    builder
      .addCase(fetchUserAppointments.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserAppointments.fulfilled, (state, action) => {
        state.loading = false;
        state.appointments = action.payload; // Replace with fetched appointments
      })
      .addCase(fetchUserAppointments.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Complete Appointment cases
    builder
      .addCase(completeAppointment.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(completeAppointment.fulfilled, (state, action) => {
        state.loading = false;
        // Update the local state by finding and updating the appointment status
        const appointmentIndex = state.appointments.findIndex(app => app.id === action.payload);
        if (appointmentIndex !== -1) {
          state.appointments[appointmentIndex].status = 'completed';
        }
      })
      .addCase(completeAppointment.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

export default appointmentsSlice.reducer;