// import { Dispatch } from "@reduxjs/toolkit";
import { addUserInfo, addUserInfoFail } from "../hooks/auth/authSlice";
import { setHeaderDefault } from "./setHeaderDefault";
import axios from "axios";
import { useDispatch } from "react-redux";

const loadUser = async (dispatch) => {
    if (localStorage["ACESSTOKEN"]) {
        setHeaderDefault(localStorage["ACESSTOKEN"]);
    }
    try {
        const { data } = await axios.get("/api/v1/auth/info");
        if (data.success) {
            dispatch(addUserInfo(data));
        }
    } catch (err) {
        console.log(err);
    }
};

export default loadUser;
