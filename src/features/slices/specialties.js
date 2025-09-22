// specialtiesSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { db } from '../../config/firestore'; // Yeh tumhara Firebase config file hai, jahaan db export kiya hua hai

// Thunk for fetching all specialties
export const fetchAllSpecialties = createAsyncThunk('specialties/fetchAll', async () => {
  try {
    const querySnapshot = await getDocs(collection(db, 'Specialties'));
    const specialties = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return specialties;
  } catch (error) {
    throw new Error(error.message);
  }
});

// Thunk for fetching filtered specialties (maslan search query ke basis pe)
// Yeh example mein name pe filter karega (lowercase match), tum change kar sakte ho
export const fetchFilteredSpecialties = createAsyncThunk('specialties/fetchFiltered', async (searchQuery) => {
  try {
    if (!searchQuery) {
      return []; // Agar query empty hai, to empty return
    }
    // Firestore mein 'where' se filter – yeh name field pe partial match ke liye
    // Note: Firestore mein exact match easy hai, partial ke liye tum Cloud Functions ya full-text search use kar sakte ho, lekin simple ke liye yeh
    // Agar partial match chahiye, to all fetch kar ke client-side filter karo (niche extraReducers mein example)
    const q = query(collection(db, 'Specialties'), where('name', '>=', searchQuery), where('name', '<=', searchQuery + '\uf8ff')); // Yeh trick for startsWith
    const querySnapshot = await getDocs(q);
    const specialties = querySnapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));
    return specialties;
  } catch (error) {
    throw new Error(error.message);
  }
});

const specialtiesSlice = createSlice({
  name: 'specialties',
  initialState: {
    specialties: [], // Saara data yahaan store hoga
    filteredSpecialties: [], // Filtered data yahaan
    loading: false,
    error: null
  },
  reducers: {
    // Optional: Agar client-side filter chahiye (Firestore query limit ke liye)
    filterSpecialtiesLocally: (state, action) => {
      const searchQuery = action.payload.toLowerCase();
      state.filteredSpecialties = state.specialties.filter(specialty =>
        specialty.name.toLowerCase().includes(searchQuery)
      );
    }
  },
  extraReducers: (builder) => {
    // Fetch All cases
    builder
      .addCase(fetchAllSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllSpecialties.fulfilled, (state, action) => {
        state.loading = false;
        state.specialties = action.payload;
      })
      .addCase(fetchAllSpecialties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });

    // Fetch Filtered cases
    builder
      .addCase(fetchFilteredSpecialties.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFilteredSpecialties.fulfilled, (state, action) => {
        state.loading = false;
        state.filteredSpecialties = action.payload;
      })
      .addCase(fetchFilteredSpecialties.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      });
  }
});

// Export actions (agar local filter use karna hai)
export const { filterSpecialtiesLocally } = specialtiesSlice.actions;

// Export reducer
export default specialtiesSlice.reducer;