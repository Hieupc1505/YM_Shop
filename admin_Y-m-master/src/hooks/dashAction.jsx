import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
// import adminAPI from "./admin.api";

// import { LoginResponse } from "../api/user.api";

export const getDataDashboard = createAsyncThunk(
    "admin/get_dash_data",
    async () => {
        const { data } = await axios.get("/api/v1/admin/dashboard");
        return data;
    }
);
