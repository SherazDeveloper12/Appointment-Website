import { configureStore } from "@reduxjs/toolkit";
import specialtiesReducer from '../slices/specialties';
import doctorsReducer from '../slices/doctors';
import appointmentsReducer from '../slices/appointmentSlice';
import authReducer from "../slices/authslice";
export const store = configureStore(
    {
        reducer:{
            specialties: specialtiesReducer,
            doctors: doctorsReducer,
            auth: authReducer,  
            appointments: appointmentsReducer,
        },
    }
)