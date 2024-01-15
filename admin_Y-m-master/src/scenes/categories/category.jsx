import { Box, Typography, Button } from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Header from "~/components/Header";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import { useTheme } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
const Category = () => {
    const [categories, setCategories] = useState([]);
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();
    const { user } = useSelector((state) => state.authReducer);

    useEffect(() => {
        const fetchData = async () => {
            const { data } = await axios.get("/api/v1/admin/categories");

            if (data && data.success) setCategories(data.categories);
        };
        if (user) fetchData();
    }, [user]);

    const handleClick = (params) => {
        navigate(`/products?category=${params}`);
    };

    const columns = [
        {
            field: "key",
            headerName: "STT",
            flex: 0.5,
        },
        {
            field: "value",
            headerName: "Tên thể loại",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "product",
            headerName: "Xem Sản Phẩm",
            flex: 0.5,
            renderCell: (params) => (
                <Button
                    variant="text"
                    color="info"
                    onClick={() => handleClick(params.row.value)}
                >
                    Xem sản phẩm
                </Button>
            ),
        },
    ];

    return (
        <Box m={"20px"}>
            <Header title="Thể Loại" subtitle="Danh Sách Các Thuộc tính khác" />
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
                {categories && (
                    <DataGrid
                        rows={categories}
                        columns={columns}
                        getRowId={(row) => row.key}
                        components={{ Toolbar: GridToolbar }}

                        // checkboxSelection
                    />
                )}
            </Box>
        </Box>
    );
};

export default Category;
