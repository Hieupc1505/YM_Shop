import { Box, Button, Typography } from "@mui/material";
import { DataGrid, GridToolbar, GridToolbarContainer } from "@mui/x-data-grid";
import { tokens } from "../../theme";
import { mockDataContacts } from "../../data/mockData";
import Header from "../../components/Header";
import { useTheme } from "@mui/material";

import { useSelector, useDispatch } from "react-redux";
import { useCallback, useEffect, useState } from "react";
import HandleColors from "./handleColors";

import FormControl from "@mui/material/FormControl";
import FormGroup from "@mui/material/FormGroup";
import FormControlLabel from "@mui/material/FormControlLabel";

import {
    getAdministrators,
    getProducts,
    getProductsByCategory,
} from "~/hooks/adminAction";
import Drawer from "@mui/material/Drawer";

import Detail from "~/components/Detail";
import ProductDetail from "./productDetail";
import { useLocation } from "react-router-dom";

import AddIcon from "@mui/icons-material/Add";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

// import { randomId } from "@mui/x-data-grid-generator";
const handleChange = (event) => {};

const Products = () => {
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const location = useLocation();
    const navigate = useNavigate();

    const [productId, setProductId] = useState(null);

    const { isLoad, data, error } = useSelector(
        (state) => state.productReducer
    );

    const { user } = useSelector((state) => state.authReducer);

    const dispatch = useDispatch();
    useEffect(() => {
        if (!!location.search && user) {
            const searchParams = new URLSearchParams(location.search);
            const queryPairs = [...searchParams.entries()];
            dispatch(getProductsByCategory(queryPairs[0][1]));
        } else {
            if (user) dispatch(getProducts());
        }
    }, [location.search, user]);

    useEffect(() => {
        if (location.state?.id) {
            setStatus(true);
            setProductId(location.state.id);
        }
    }, []);

    const anchor = "right";
    const [status, setStatus] = useState(false);

    const handleDetail = (id) => {
        setStatus(() => true);
        setProductId((prev) => id);
    };

    function EditToolbar(props) {
        const { setRows, setRowModesModel } = props;

        return (
            <GridToolbarContainer>
                <GridToolbar />
                <Link to={"/products/add"}>
                    <Button
                        color="primary"
                        startIcon={<AddIcon />}
                        // onClick={handleClick}
                        sx={{ marginLeft: "auto" }}
                    >
                        Add record
                    </Button>
                </Link>
            </GridToolbarContainer>
        );
    }

    const columns = [
        {
            field: "_id",
            headerName: "ID",
            flex: 0.5,
        },
        {
            field: "name",
            headerName: "Name",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "price",
            headerName: "Price",
            flex: 1,
            cellClassName: "Price-column--cell",
        },
        {
            field: "brand",
            headerName: "Brand",
            flex: 1,
            cellClassName: "Brand-column--cell",
        },
        {
            field: "specs[0].value",
            headerName: "Thể Loại",
            flex: 1,
            cellClassName: "Brand-column--cell",
            renderCell: (params) => handleRenderCategory(params.row.specs, 0),
        },

        {
            field: "description",
            headerName: "description",
            flex: 1,
            cellClassName: "description-column--cell",
        },
        {
            field: "release_date",
            headerName: "Date",
            flex: 1,
        },
        {
            field: "colors",
            headerName: "Colors",
            flex: 2,
            cellClassName: "address-column--cell",
            renderCell: (params) => (
                <HandleColors colors={params.row.options[0]} />
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

    return (
        <Box m="20px">
            <Header
                title="SẢN PHẨM"
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
                    slots={{
                        toolbar: EditToolbar,
                    }}
                    // checkboxSelection
                />
            </Box>
            <Drawer
                anchor={anchor}
                open={status}
                onClose={() => setStatus(false)}
            >
                <Box sx={{ width: "450px", height: "100%" }}>
                    <Detail>
                        <ProductDetail productId={productId} />
                    </Detail>
                </Box>
            </Drawer>
        </Box>
    );
};

export default Products;

function handleRenderCategory(specs, stt) {
    return <Typography>{specs[stt].value}</Typography>;
}
