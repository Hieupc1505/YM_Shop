import { createSlice } from "@reduxjs/toolkit";

import { userSignIn, userGetInfo } from "./authAction";

const initialState = {
    isLoad: false,
    user: null,
    error: null,
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        addUserInfo: (state, action) => {
            const { payload } = action;
            console.log("payload");
            // console.log(payload);
            return {
                ...state,
                isLoad: false,
                user: payload.element.user,
            };
        },
        addUserInfoFail: (state) => {
            return {
                user: null,
                error: null,
                isLoad: false,
            };
        },
        changeStatusLoad: (state, action) => {
            const { payload } = action;
            return {
                ...state,
                isLoad: payload,
            };
        },
    },
    extraReducers(builder) {
        builder.addCase(userSignIn.fulfilled, (state, action) => {
            const { payload } = action;
            return {
                isLoad: false,
                user: null,
                error: null,
            };
        });
        builder.addCase(userSignIn.pending, () => {
            return {
                isLoad: true,
                user: null,
                error: null,
            };
        });

        builder.addCase(userGetInfo.pending, (state, action) => {
            return {
                ...state,
                isLoad: true,
            };
        });
        builder.addCase(userGetInfo.fulfilled, (state, action) => {
            const { payload } = action;

            return {
                isLoad: false,
                user: payload?.data,
                error: null,
            };
        });
    },
});

// Action creators are generated for each case reducer function
// export const { increment, decrement, incrementByAmount } = authSlice.actions;
export const { addUserInfo, addUserInfoFail, changeStatusLoad } =
    authSlice.actions;

export default authSlice.reducer;
