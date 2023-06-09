import { createSlice } from '@reduxjs/toolkit';

const proportySlice = createSlice({
    name: 'proporty',
    initialState: {},
    reducers: {
        setProporty(state, action) {
            state.proporties = action.payload;
        },
    },
});

export const { setProporty } = proportySlice.actions;
export default proportySlice.reducer;