import { configureStore } from "@reduxjs/toolkit";
import adminReducer from "~/hooks/admin/adminSlice";
import productReducer from "./hooks/products/productSlice";
import orderReducer from "./hooks/orders/OrderSlice";
import customerReducer from "./hooks/customers/customerSlice";
import dashboardReducer from "./hooks/dashboard/dashboardSlice";
import authReducer from "./hooks/auth/authSlice";
export const store = configureStore({
    reducer: {
        adminReducer,
        productReducer,
        orderReducer,
        customerReducer,
        dashboardReducer,
        authReducer,
    },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export const RootState = store.getState;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export const AppDispatch = store.dispatch;
