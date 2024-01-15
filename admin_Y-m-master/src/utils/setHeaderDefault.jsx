import axios from "axios";

export const setHeaderDefault = (token) => {
    if (token) {
        axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
        delete axios.defaults.headers.common["Authorization"];
    }
};

export const setLanguageDefault = (lang) => {
    axios.defaults.headers.common["Accept-Language"] = "vn";
};
