import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    isload: false,
    data: null,
    error: null,
};

export const actionPending = (state, action) => {
    return {
        ...state,
        isLoad: true,
    };
};

const dashSuccess = (state, action) => {
    const { payload } = action;
    return {
        ...state,
        isLoad: false,
        data: payload.element,
    };
};

import { getDataDashboard } from "../dashAction";

export const dashSlice = createSlice({
    name: "dashctrl",
    initialState,
    reducers: {},
    extraReducers(builder) {
        builder.addCase(getDataDashboard.pending, actionPending);
        builder.addCase(getDataDashboard.fulfilled, dashSuccess);
    },
});

// Action creators are generated for each case reducer function
// export const { addhomeInfo, addhomeInfoFail, changeStatusLoad } =
//     adminSlice.actions;

export default dashSlice.reducer;
