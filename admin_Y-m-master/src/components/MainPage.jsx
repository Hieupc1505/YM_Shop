import React, { useState, useEffect } from "react";
import Sidebar from "../scenes/global/Sidebar";
import Topbar from "../scenes/global/Topbar";
import loadUser from "../utils/loadUser";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
const MainPage = ({ element }) => {
    const [isSidebar, setIsSidebar] = useState(true);
    const navigate = useNavigate();
    const dispatch = useDispatch();
    useEffect(() => {
        loadUser(dispatch);
    }, [localStorage["ACESSTOKEN"]]);
    return (
        <div className="app">
            <Sidebar isSidebar={true} />
            <main className="content">
                <Topbar setIsSidebar={setIsSidebar} />
                {element}
            </main>
        </div>
    );
};

export default MainPage;
