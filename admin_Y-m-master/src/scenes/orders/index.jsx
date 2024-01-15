import React from "react";
import { getOrders } from "~/hooks/adminAction";
import { Avatar, Box, Button, Drawer, Typography } from "@mui/material";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import Detail from "~/components/Detail";
import moment from "moment/moment";
import HandleStatus from "./handleStatus";
import { useNavigate } from "react-router-dom";

const handlePayType = (type) => {
    if (type == 0)
        return <Typography variant="caption">Thanh toán online</Typography>;
    return <Typography variant="caption">Thanh toán khi nhận hàng</Typography>;
};

const Order = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const [content, setContent] = useState(mockDataContacts);
    const [productId, setProductId] = useState(null);
    const navigate = useNavigate();

    const { isLoad, data, error } = useSelector((state) => state.orderReducer);
    const { user } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();

    useEffect(() => {
        if (user) dispatch(getOrders());
    }, [user]);

    const anchor = "right";
    const [status, setStatus] = useState(false);

    const handleDetail = (id) => {
        setStatus(() => true);
        navigate(`/orders/${id}/show`);
    };

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "email",
            headerName: "Khách Hàng",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "address",
            headerName: "Địa Chỉ Giao Hàng",
            flex: 1,
            cellClassName: "Price-column--cell",
        },
        {
            field: "status",
            headerName: "Trạng thái", //trạng thái tổng quát
            flex: 1,
            cellClassName: "Brand-column--cell",
            renderCell: (params) => <HandleStatus status={params.row.status} />,
        },

        {
            field: "pay",
            headerName: "Thanh toán",
            flex: 1,
            cellClassName: "description-column--cell",
            renderCell: (params) => handlePayType(params.row.pay),
        },
        {
            field: "createdAt",
            headerName: "Đã Cập Nhập",
            flex: 1,
            renderCell: (params) =>
                moment(params.row.createdAt).format("YYYY-MM-DD HH:MM"),
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
                    checkboxSelection
                />
            </Box>
            {/* <Drawer
                anchor={anchor}
                open={status}
                onClose={() => setStatus(false)}
            >
                <Box sx={{ width: "450px", height: "100%" }}>
                    <Detail></Detail>
                </Box>
            </Drawer> */}
        </Box>
    );
};

export default Order;
