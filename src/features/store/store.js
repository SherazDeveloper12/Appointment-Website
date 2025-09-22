import { configureStore } from "@reduxjs/toolkit";
import specialtiesReducer from '../slices/specialties';
export const store = configureStore(
    {
        reducer:{
            specialties: specialtiesReducer,
        },
    }
)