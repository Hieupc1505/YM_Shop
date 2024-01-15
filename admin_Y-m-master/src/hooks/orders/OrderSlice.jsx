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

import { getOrders } from "../adminAction";

export const orderSlice = createSlice({
    name: "orderCtrl",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getOrders.pending, actionPending);
        builder.addCase(getOrders.fulfilled, orderSuccess);
    },
});

// Action creators are generated for each case reducer function
// export const { addhomeInfo, addhomeInfoFail, changeStatusLoad } =
//     adminSlice.actions;

export default orderSlice.reducer;
