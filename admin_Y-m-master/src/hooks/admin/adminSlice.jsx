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

const adminSuccess = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        isLoad: false,
        data: payload.data,
    };
};

import { getAdministrators } from "../adminAction";

export const adminSlice = createSlice({
    name: "adminControl",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getAdministrators.pending, actionPending);
        builder.addCase(getAdministrators.fulfilled, adminSuccess);
    },
});

// Action creators are generated for each case reducer function
// export const { addhomeInfo, addhomeInfoFail, changeStatusLoad } =
//     adminSlice.actions;

export default adminSlice.reducer;
