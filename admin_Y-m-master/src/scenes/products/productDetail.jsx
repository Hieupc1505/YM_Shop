import React, { lazy, useCallback, useEffect, useState } from "react";
import adminAPI from "~/hooks/admin.api";
import {
    Avatar,
    Box,
    InputLabel,
    Typography,
    Stack,
    Dialog,
} from "@mui/material";
import Backdrop from "@mui/material/Backdrop";
import CircularProgress from "@mui/material/CircularProgress";
import Button from "@mui/material/Button";
import ImageList from "@mui/material/ImageList";
import ImageListItem from "@mui/material/ImageListItem";
import BtnActionDetail from "~/components/BtnActionDetail";
import { useNavigate } from "react-router-dom";
const ProductDetail = ({ productId }) => {
    const [data, setData] = useState(null);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
            const data = await adminAPI.getInfoProductByAdmin(productId);
            setData(data.product);
        };
        fetchData();
    }, [productId]);

    const [open, setOpen] = React.useState(false);
    const handleClose = () => {
        setOpen(false);
    };
    const handleOpen = () => {
        setOpen(true);
    };

    const renderTextField = (label, content, index) => (
        <Box key={index} component={"section"} sx={{ mb: 3 }}>
            <InputLabel variant="standard" htmlFor="uncontrolled-native">
                {label}
            </InputLabel>
            <Typography variant="h5">{content}</Typography>
        </Box>
    );

    const renderImages = ({ main, list }, index) => (
        <Stack
            justifyContent={"center"}
            alignItems={"center"}
            sx={{ mb: 3, mt: 2.5 }}
        >
            <Avatar
                sx={{ width: "200px", height: "200px" }}
                key={index}
                src={main}
                variant="square"
            />
            {!!list.length && (
                <InputLabel
                    sx={{ mt: 1.2, cursor: "pointer" }}
                    onClick={handleOpen}
                >
                    {list.length} ảnh nữa
                </InputLabel>
            )}
        </Stack>
    );

    const renderSpecial = (specs) =>
        specs.map(({ key, value }, index) =>
            renderTextField(key, value, index)
        );

    const renderOptions = (options) =>
        options.map(({ key, value }, index) =>
            renderTextField(key, value.toString(), index)
        );

    const handleDelete = useCallback(() => {
        if (window.confirm("Bạn có chắc muốn xóa không??")) {
            const fetchData = async () => {
                const { data } = await axios.post("/api/v1/product/delete", {
                    productId,
                });
                console.log(data);
                if (data && data.success) navigate("/products", { state: {} });
            };
            fetchData();
        }
    }, [productId]);

    const handleEdit = useCallback(() => {
        if (productId) {
            navigate(`/product/edit/${productId}`);
        } else {
            alert("Không có sản phẩm được chọn");
        }
    }, [productId]);

    return (
        <Box>
            <BtnActionDetail
                handleDelete={handleDelete}
                handleEdit={handleEdit}
            />
            {!!data && renderImages(data["images"], 33)}
            {!!data &&
                Object.keys(data).map((item, index) => {
                    if (typeof data[item] === "string") {
                        return (
                            item !== "images" &&
                            renderTextField(item, data[item], index)
                        );
                    }
                    return null;
                })}
            {!!data && renderSpecial(data["specs"])}
            {!!data && renderOptions(data["options"])}
            {!!data && (
                <Backdrop
                    sx={{
                        color: "#fff",
                        zIndex: (theme) => theme.zIndex.drawer + 1,
                    }}
                    open={open}
                    onClick={handleClose}
                    invisible={false}
                >
                    <ImageList
                        sx={{ width: 500, height: 450 }}
                        cols={3}
                        rowHeight={164}
                    >
                        {data["images"].list.map((item, index) => (
                            <ImageListItem key={index}>
                                <img
                                    srcSet={``}
                                    src={item}
                                    alt={item.title}
                                    loading="lazy"
                                />
                            </ImageListItem>
                        ))}
                    </ImageList>
                </Backdrop>
            )}
        </Box>
    );
};

export default React.memo(ProductDetail);
