import React, { useEffect, useState } from "react";
import CustomTextField from "~/components/CustomTextField";
import {
    Box,
    Avatar,
    Divider,
    Button,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    FormHelperText,
} from "@mui/material";
import Header from "~/components/Header";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { styled } from "@mui/material/styles";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import BtnSubmit from "~/components/BtnSubmit";
// import { C } from "node_modules/@fullcalendar/core/internal-common";

const VisuallyHiddenInput = styled("input")({
    clip: "rect(0 0 0 0)",
    clipPath: "inset(50%)",
    height: 1,
    overflow: "hidden",
    position: "absolute",
    bottom: 0,
    left: 0,
    whiteSpace: "nowrap",
    width: 1,
});

const EditInfo = () => {
    const [avatar, setAvatar] = useState("");
    const [upload, setUpload] = useState(null);
    const [role, setRole] = useState(0);
    const [customer, setCustomers] = useState(null);
    const [loading, setLoading] = useState(false);

    const params = useParams();
    const location = useLocation();
    const navigate = useNavigate();
    const { state } = location;

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().max(250, "Họ không vượt quá 64 kí tự"),
        email: Yup.string().max(250, "Tên không vượt quá 64 kí tự"),
        // email: Yup.string()
        //     .required()
        //     .email("Định dạng email không hợp lệ.")
        //     .max(64, "Email không vượt quá 64 kí tự"),
        // // gender: Yup.string().required(),
        // // birthday: Yup.string().required(),
        // number: Yup.string()
        //     .required("Vui lòng nhập số điện thoại.")
        //     .matches(phoneRegExp, "Số điện thoại không hợp lệ."),
        // height: Yup.number(),
        // weight: Yup.number(),
        // otp: Yup.string().matches(/\b\d{6}\b/g, "Mã OTP không hợp lệ"),
    });
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm({
        resolver: yupResolver(validationSchema),
    });

    const showImage = async (e) => {
        // e.preventDefault();
        const file = e.target.files[0];

        const url = URL.createObjectURL(file);
        const base64 = await convertBase64(file);

        setAvatar(url);
        setUpload(base64);
    };

    const onSubmit = async (form) => {
        setLoading(true);
        const formData = {
            "userInfo.address": form["address"],
            "userInfo.role": role,
            "userInfo.number": form["phone"],
            "userInfo.displayName": form["name"],
        };

        const { data } = await axios.post("/api/v1/user/update", {
            id: params.id,
            avatar: upload,
            user: JSON.stringify(removeEmptyFields(formData)),
            now: avatar,
        });
        setLoading(false);
        if (data && data.success) navigate("/customers", { state: {} });
    };

    const handleSelect = (e) => {
        setRole(e.target.value);
    };

    useEffect(() => {
        if (state && state.customer) {
            setCustomers(state.customer);
            if (state.customer?.avatar) setAvatar(state.customer?.avatar);
        }
    }, [params.id]);
    console.log(customer);
    return (
        <Box m="20px" pb={"100px"}>
            <Header
                title="CẬP NHẬP THÔNG TIN TÀI KHOẢN"
                subtitle="List of Contacts for Future Reference"
            />
            <Divider />
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                {!!avatar && (
                    <Avatar
                        variant="square"
                        src={avatar}
                        className="img-main"
                        sx={{ width: "200px", height: "200px" }}
                    />
                )}
                {customer && (
                    <>
                        <Button
                            component="label"
                            variant="contained"
                            startIcon={<CloudUploadIcon />}
                        >
                            Ảnh đại diện
                            <VisuallyHiddenInput
                                type="file"
                                // multiple
                                name={"file"}
                                onChange={showImage}
                            />
                        </Button>
                        <CustomTextField
                            helperText="Email"
                            // required
                            name={"email"}
                            register={register}
                            errors={errors}
                            value={customer.email}
                            readOnly={true}
                            disabled
                        />
                        <CustomTextField
                            helperText="Phương thức đăng nhập"
                            required
                            name={"provider"}
                            register={register}
                            errors={errors}
                            value={handleProvider(customer.provider)}
                            readOnly
                            disabled
                        />
                        <CustomTextField
                            helperText="Tên hiển thị"
                            required
                            name={"name"}
                            register={register}
                            errors={errors}
                            value={customer.displayName}
                        />
                        <CustomTextField
                            helperText="Số điện thoại"
                            name={"phone"}
                            register={register}
                            errors={errors}
                            required={false}
                            value={customer?.number}
                        />

                        <CustomTextField
                            helperText="Address"
                            required
                            name={"address"}
                            register={register}
                            errors={errors}
                            value={customer.address}
                        />

                        <FormControl fullWidth sx={{ mt: 2 }}>
                            <FormHelperText sx={{ ml: 0 }}>
                                Vai Trò
                            </FormHelperText>
                            <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={role}
                                onChange={handleSelect}
                                defaultValue={+customer.role}
                            >
                                <MenuItem value={0}>Người dùng</MenuItem>
                                <MenuItem value={1}>Quản trị viên</MenuItem>
                            </Select>
                        </FormControl>
                    </>
                )}
                <BtnSubmit loading={loading} />
            </Box>
        </Box>
    );
};

export default EditInfo;

function convertBase64(file) {
    return new Promise((res, rej) => {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);
        fileReader.onload = () => {
            res(fileReader.result);
        };
        fileReader.onerror = (err) => {
            rej(err);
        };
    });
}

function handleProvider(provider) {
    if (provider === "lc") return "Local";
    else if (provider === "gg") return "Google";
    else return "Facebook";
}

function removeEmptyFields(obj) {
    const result = {};

    for (const key in obj) {
        console.log(key);
        if (obj[key] !== null && obj[key] !== undefined) {
            result[key] = obj[key];
        }
    }

    return result;
}
