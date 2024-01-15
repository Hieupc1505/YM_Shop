import { createAsyncThunk } from "@reduxjs/toolkit";
import adminAPI from "./admin.api";

// import { LoginResponse } from "../api/user.api";

export const getAdministrators = createAsyncThunk(
    "admin/get_list_admin",
    async () => {
        const data = await adminAPI.getAdministrators();

        return data;
    }
);

export const getProducts = createAsyncThunk(
    "admin/get_all_products",
    async () => {
        const data = await adminAPI.getAllProducts();
        return data;
    }
);

export const getProductsByCategory = createAsyncThunk(
    "admin/get_products_by_category",
    async (category) => {
        const data = await adminAPI.getProductsByCategory(category);
        return data;
    }
);

export const getOrders = createAsyncThunk("admin/get_orders", async () => {
    const data = await adminAPI.getOrders();
    return data;
});

export const getCustomers = createAsyncThunk(
    "admin/get_customers",
    async () => {
        const data = await adminAPI.getCustomers();
        return data;
    }
);

const getProductInfo = async () => {};
