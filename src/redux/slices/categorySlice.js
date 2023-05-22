import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
    name: 'category',
    initialState: { categories: localStorage.getItem('categories') },
    reducers: {
        setCategory(state, action) {
            state.categories = action.payload;
        },
    },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;