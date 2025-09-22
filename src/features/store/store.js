import { configureStore } from "@reduxjs/toolkit";
import specialtiesReducer from '../slices/specialties';
import doctorsReducer from '../slices/doctors';
export const store = configureStore(
    {
        reducer:{
            specialties: specialtiesReducer,
            doctors: doctorsReducer,
        },
    }
)