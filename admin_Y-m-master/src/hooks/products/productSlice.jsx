import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isload: false,
    data: [],
    error: null,
};

export const actionPending = (state, action) => {
    return {
        ...state,
        isLoad: true,
    };
};

const orderSuccess = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        isLoad: false,
        data: payload.data,
    };
};

import { getProducts, getProductsByCategory } from "../adminAction";

export const productSlice = createSlice({
    name: "productCtrl",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getProducts.pending, actionPending);
        builder.addCase(getProducts.fulfilled, orderSuccess);
        builder.addCase(getProductsByCategory.pending, actionPending);
        builder.addCase(getProductsByCategory.fulfilled, orderSuccess);
    },
});

// Action creators are generated for each case reducer function
// export const { addhomeInfo, addhomeInfoFail, changeStatusLoad } =
//     adminSlice.actions;

export default productSlice.reducer;
