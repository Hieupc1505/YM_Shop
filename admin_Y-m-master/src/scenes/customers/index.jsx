import { Avatar, Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState, useCallback } from "react";

import { getCustomers } from "~/hooks/adminAction";

import Drawer from "@mui/material/Drawer";
import Detail from "~/components/Detail";
import { useLocation } from "react-router-dom";
import CustomerDetail from "./customerDetail";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Customers = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const { isLoad, data, error } = useSelector(
        (state) => state.customerReducer
    );
    const { user } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [customers, setCustomers] = useState(null);

    useEffect(() => {
        if (user) dispatch(getCustomers());
    }, [user]);

    const anchor = "right";
    const [status, setStatus] = useState(false);
    const [admin, setAdmin] = useState(null);

    const handleDetail = (_id) => {
        setStatus(() => true);
        setAdmin((prev) => _id);
    };
    useEffect(() => {
        if (location.state?._id) {
            setStatus(() => true);
            setAdmin(() => location.state?._id);
        }
    }, []);

    const existAddr = (addr) => {
        return addr !== "," || !!addr ? true : false;
    };

    const columns = [
        { field: "_id", headerName: "ID", flex: 0.5 },
        // { field: "registrarId", headerName: "Registrar ID" },
        {
            field: "displayName",
            headerName: "DisplayName",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "email",
            headerName: "email",
            flex: 1,
            cellClassName: "email-column--cell",
        },
        {
            field: "provider",
            headerName: "provider",
            flex: 1,
            cellClassName: "provider-column--cell",
        },

        {
            field: "avatar",
            headerName: "Avatar",
            flex: 1,
            cellClassName: "avatar-column--cell",
            renderCell: (params) => (
                <Avatar variant="square" src={params.row.avatar} />
            ),
        },

        {
            field: "role",
            headerName: "role Number",
            flex: 1,
        },
        {
            field: "address",
            headerName: "Address",
            flex: 1.5,
            cellClassName: "address-column--cell",
            renderCell: (params) => (
                <Typography>{params?.address ?? "(Trống)"}</Typography>
            ),
        },
        {
            field: "isDeleted",
            headerName: "Trạng thái",
            flex: 0.8,
            renderCell: (params) => (
                <Typography color={params.row.isDeleted ? "error" : "info"}>
                    {params.row.isDeleted ? "Đã xóa" : "Hoạt động"}
                </Typography>
            ),
        },
        {
            field: "Chi Tiết",
            headerName: "Chi Tiết",
            flex: 0.5,
            align: "center",
            renderCell: (params) => (
                <Button
                    variant={"outlined"}
                    color="success"
                    size="small"
                    onClick={() => handleDetail(params.row._id)}
                >
                    Chi Tiết
                </Button>
            ),
        },
    ];

    // console.log(admin);
    return (
        <Box m="20px">
            <Header
                title="CUSTOMERS"
                subtitle="List of Contacts for Future Reference"
            />
            <Box
                m="40px 0 0 0"
                height="75vh"
                sx={{
                    "& .MuiDataGrid-root": {
                        border: "none",
                    },
                    "& .MuiDataGrid-cell": {
                        borderBottom: "none",
                    },
                    "& .name-column--cell": {
                        color: colors.greenAccent[300],
                    },
                    "& .MuiDataGrid-columnHeaders": {
                        backgroundColor: colors.blueAccent[700],
                        borderBottom: "none",
                    },
                    "& .MuiDataGrid-virtualScroller": {
                        backgroundColor: colors.primary[400],
                    },
                    "& .MuiDataGrid-footerContainer": {
                        borderTop: "none",
                        backgroundColor: colors.blueAccent[700],
                    },
                    "& .MuiCheckbox-root": {
                        color: `${colors.greenAccent[200]} !important`,
                    },
                    "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                        color: `${colors.grey[100]} !important`,
                    },
                }}
            >
                <DataGrid
                    rows={data}
                    columns={columns}
                    getRowId={(row) => row._id}
                    components={{ Toolbar: GridToolbar }}
                />
            </Box>
            <Drawer
                anchor={anchor}
                open={status}
                onClose={() => setStatus(false)}
            >
                <Box sx={{ width: "450px", height: "100%" }}>
                    <Detail>
                        <CustomerDetail id={admin} />
                    </Detail>
                </Box>
            </Drawer>
        </Box>
    );
};
export default Customers;
