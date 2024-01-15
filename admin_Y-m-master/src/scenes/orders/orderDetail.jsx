import React, { useEffect, useState } from "react";
import { renderImages, renderTextField } from "~/components/TextField";
import {
    Avatar,
    Box,
    Paper,
    Typography,
    Chip,
    InputLabel,
    Button,
} from "@mui/material";
import { useSelector, useDispatch } from "react-redux";
import Header from "~/components/Header";
import adminAPI from "~/hooks/admin.api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { useTheme } from "@mui/material";
import { tokens } from "~/theme";
import moment from "moment";
import { DataGrid, GridToolbar } from "@mui/x-data-grid";
import ProductName from "./ProductName";
import axios from "axios";
import { orange } from "@mui/material/colors";
import convertMoney from "../../utils/convertMoney";
const OrderDetail = ({ order }) => {
    const location = useLocation();
    const params = useParams();
    const theme = useTheme();
    const colors = tokens(theme.palette.mode);
    const navigate = useNavigate();

    const [data, setData] = useState(null);
    const [proInOrder, setProInOrder] = useState(null);
    useEffect(() => {
        const fetchData = async () => {
            const { data, products } = await adminAPI.getOrderDetail(params.id);

            if (!!data.length) {
                setData(() => data[0]);
                setProInOrder(() => products);
            } else setData(null);
        };
        fetchData();
    }, [params.id]);

    const renderStatus = (status) => {
        if (status === 1)
            return <Chip label={"Đang vận chuyển"} color="warning" />;
        if (status === 2)
            return <Chip label={"Đã giao hàng"} color="success" />;
        if (status === -1) return <Chip label={"Đã hủy"} color="error" />;

        return <Chip label={"Đang chờ xác nhận"} color="info" />;
    };

    const columns = [
        {
            field: "sanpham",
            headerName: "Sản phẩm",
            flex: 3,
            renderCell: (params) => (
                <ProductName id={params.row.productId} list={proInOrder} />
            ),
        },

        {
            field: "quantity",
            headerName: "Số lượng",
            flex: 1,
            cellClassName: "name-column--cell",
        },
        {
            field: "pay",
            headerName: "Giá(mỗi mặt hàng)",
            flex: 1,
            cellClassName: "email-column--cell",
        },
    ];

    const handleClickEmail = (_id) => {
        navigate("/customers", { state: { _id } });
    };

    const updateStatusOrder = async (status) => {
        const { data } = await axios.post("/api/v1/order/update", {
            id: params.id,
            status,
        });
        if (data && data.success) {
            alert("Cập nhập thành công");
            navigate("/orders");
        }
    };

    const EditToolbar = () => {
        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "flex-end",
                    alignContent: "center",
                    pb: 2,
                    gap: 2,
                }}
            >
                {+data["status"] === 0 && (
                    <Button
                        variant="outlined"
                        color="info"
                        onClick={() => updateStatusOrder(1)}
                    >
                        Xác nhận đơn hàng
                    </Button>
                )}
                {[0, 1].includes(+data["status"]) && (
                    <Button
                        variant="outlined"
                        color="error"
                        onClick={() => updateStatusOrder(-1)}
                    >
                        Hủy đơn hàng
                    </Button>
                )}
            </Box>
        );
    };
    console.log(data);
    return (
        <Box m={"20px"}>
            <Box
                display="flex"
                justifyContent="space-between"
                alignItems="center"
            >
                <Header
                    title="Chi Tiết Đơn Hàng"
                    subtitle="Show detail order"
                />
            </Box>
            <Paper sx={{ p: 4, backgroundColor: colors.primary[400] }}>
                {!!data && (
                    <>
                        {renderTextField("ID", data["_id"], 0)}
                        {renderTextField(
                            "Khách hàng",
                            <Typography
                                variant="h5"
                                component={"span"}
                                color={"red"}
                                sx={{
                                    cursor: "pointer",
                                }}
                                onClick={() => handleClickEmail(data["_id"])}
                            >
                                {data["email"]}
                            </Typography>,
                            1
                        )}
                        {renderTextField(
                            "Địa chỉ giao hàng",
                            data["address"],
                            2
                        )}
                        {renderTextField(
                            "Trạng thái",
                            renderStatus(+data["status"]),
                            3
                        )}
                        {renderTextField(
                            "Tổng đơn hàng",
                            convertMoney(+data["total"]),
                            4,
                            { color: orange[600], fontSize: "18px" }
                        )}
                        {renderTextField(
                            "Hình thức thanh toán",
                            data["pay"] == 1
                                ? "Thanh toán online"
                                : "Thanh toán khi nhận hàng",
                            5,
                            { color: orange[800] }
                        )}
                        {data["payStatus"] &&
                            renderTextField(
                                "Trạng thái thanh toán",
                                data["payStatus"] == 1
                                    ? "Đã thanh toán"
                                    : "Chưa thanh toán",
                                6,
                                { color: orange[600] }
                            )}
                    </>
                )}

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
                    {!!data && (
                        <DataGrid
                            rows={data.products}
                            columns={columns}
                            getRowId={(row) => row.productId}
                            slots={{
                                toolbar: EditToolbar,
                            }}
                            // components={{ Toolbar: GridToolbar }}
                        />
                    )}
                </Box>
            </Paper>
        </Box>
    );
};

export default OrderDetail;
