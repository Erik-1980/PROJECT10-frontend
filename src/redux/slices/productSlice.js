import { createSlice } from '@reduxjs/toolkit';

const productSlice = createSlice({
    name: 'product',
    initialState: {},
    reducers: {
        setProduct(state, action) {
            state.products = action.payload;
        },
    },
});

export const { setProduct } = productSlice.actions;
export default productSlice.reducer;