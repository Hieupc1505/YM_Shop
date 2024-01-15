import { Avatar, Box, Button } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";

import { getAdministrators } from "~/hooks/adminAction";
import AdminDetail from "./adminDetail";
import Drawer from "@mui/material/Drawer";
import Detail from "~/components/Detail";
import { useLocation } from "react-router-dom";

const Administrators = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const { isLoad, data, error } = useSelector((state) => state.adminReducer);
    const { user } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    const [admin, setAdmin] = useState(null);

    useEffect(() => {
        if (user) dispatch(getAdministrators());
    }, [user]);

    const anchor = "right";
    const [status, setStatus] = useState(false);

    const handleDetail = (_id) => {
        setStatus(() => true);
        setAdmin(_id);
    };
    useEffect(() => {
        if (location.state?.email) {
            setStatus(() => true);
            setAdmin(() => location.state?.email);
        }
    }, []);
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
            flex: 1.8,
            cellClassName: "address-column--cell",
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

    return (
        <Box m="20px">
            <Header
                title="CONTACTS"
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
                        <AdminDetail id={admin} />
                    </Detail>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Administrators;
