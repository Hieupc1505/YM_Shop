import { createAsyncThunk } from "@reduxjs/toolkit";

import { setHeaderDefault } from "../../utils/setHeaderDefault";
import axios from "axios";

export const userSignIn = createAsyncThunk(
    "users/sign-in",
    async (userInfo, thunkAPI) => {
        const { data } = await axios.post("/api/v1/auth/login", userInfo);
        localStorage.setItem("ACESSTOKEN", data?.element.tokens);
        setHeaderDefault(data.element.tokens);
        return data;
    }
);
export const userLogOut = createAsyncThunk("users/log-out", async () => {
    const data = await axios.get(`/api/v1/auth/logout`);
    localStorage.removeItem("ACCESSTOKEN");
    setHeaderDefault(null);
    return data;
});

export const userGetInfo = createAsyncThunk("users/get-info", async () => {
    const { data } = await axios.get("/api/v1/auth/info");

    return data;
});
