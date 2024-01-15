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

const customerSuccess = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        isLoad: false,
        data: payload.customers,
    };
};

import { getCustomers } from "../adminAction";

export const customerSlice = createSlice({
    name: "customerCtrl",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getCustomers.pending, actionPending);
        builder.addCase(getCustomers.fulfilled, customerSuccess);
    },
});

// Action creators are generated for each case reducer function
// export const { addhomeInfo, addhomeInfoFail, changeStatusLoad } =
//     adminSlice.actions;

export default customerSlice.reducer;
