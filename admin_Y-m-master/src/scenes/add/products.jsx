import {
    Avatar,
    Box,
    Divider,
    Button,
    ImageList,
    ImageListItem,
    ImageListItemBar,
    Select,
    MenuItem,
    Typography,
    InputAdornment,
    OutlinedInput,
} from "@mui/material";
import Header from "../../components/Header";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import EmptyTextarea from "./TextareaAutosize";
import CustomTextField from "~/components/CustomTextField";
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

const handleChange = (event) => {};

function srcset(image, width, height, rows = 1, cols = 1) {
    return {
        src: image,
        srcSet: `${image}?w=${width * cols}&h=${
            height * rows
        }&fit=crop&auto=format&dpr=2 2x`,
    };
    // return {
    //     src: `${image}?w=${width * cols}&h=${
    //         height * rows
    //     }&fit=crop&auto=format`,
    //     srcSet: `${image}?w=${width * cols}&h=${
    //         height * rows
    //     }&fit=crop&auto=format&dpr=2 2x`,
    // };
}

const AddProduct = () => {
    const [list, setList] = useState(null);
    // const handleFileInputChange = async (e) => {
    //     // if (images) deleteImage(images.public_id);
    //     try {
    //         const file = e.target.files;
    //         let ins = file.length;
    //         let formData = new FormData();

    //         for (let x = 0; x < ins; x++) {
    //             formData.append("image", file[x]);
    //         }
    //         // =================================///==================
    //         // if (!file) return alert("File is not exist");
    //         // if (file.size > 1024 * 1024) return alert("Size too large!!");
    //         // if (file.type !== "image/jpeg" && file.type !== "image/png")
    //         //     return alert("File format is incorrect");
    //         // formData.append("file", file);
    //         // =========================================================

    //         // setLoading(true);
    //         console.log("upload img", formData);
    //         const res = await axios.post(
    //             `/api/v1/admin/products/add`,
    //             formData,
    //             {
    //                 headers: {
    //                     "content-type": "multipart/form-data",
    //                 },
    //             }
    //         );
    //         setList(Array.from(file).map(URL.createObjectURL));

    //         // setLoading(false);
    //         // if (res.data.success)
    //         //     setImages({
    //         //         main: res.data.imgs[0],
    //         //         imgArr: res.data.imgs,
    //         //     });
    //     } catch (err) {
    //         console.log(err);
    //     }
    //     // previewFile(file);

    // console.log(main);

    const handleFileInputChangev2 = (e) => {
        const reader = new FileReader();
    };

    const convertBase64 = (file) => {
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
    };

    const uploadImage = async (e) => {
        const files = e.target.files;
        if (files.length === 1) {
            const base64 = await convertBase64(files[0]);
            uploadSingleImage(base64);
            return;
        }
        const base64s = [];
        for (let i = 0; i < files.length; i++) {
            let base = await convertBase64(files[i]);
            base64s.push(base);
        }
        uploadMultipleImages(base64s);
    };

    const imageList = (itemData) => (
        <ImageList
            sx={{
                width: 500,
                height: 450,
                // Promote the list into its own layer in Chrome. This costs memory, but helps keeping high FPS.
                transform: "translateZ(0)",
            }}
            rowHeight={200}
            gap={1}
        >
            {itemData.map((item) => {
                const cols = 1;
                const rows = 1;

                return (
                    <ImageListItem key={item} cols={cols} rows={rows}>
                        <img
                            {...srcset(item, 250, 200, rows, cols)}
                            alt={item}
                            loading="lazy"
                        />
                        {/* <ImageListItemBar
                            sx={{
                                background:
                                    "linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, " +
                                    "rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)",
                            }}
                            // title={item}
                            position="top"
                            actionIcon={
                                <Button
                                    sx={{ color: "white" }}
                                    aria-label={`star}`}
                                >
                                    Set main
                                </Button>
                            }
                            actionPosition="left"
                        /> */}
                    </ImageListItem>
                );
            })}
        </ImageList>
    );

    const validationSchema = Yup.object().shape({
        name: Yup.string().required().max(64, "Họ không vượt quá 64 kí tự"),
        price: Yup.string().required().max(64, "Tên không vượt quá 64 kí tự"),
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

    const [mainImage, setMainImage] = useState("");
    const [listImage, setListImage] = useState([]);
    const [images, setImages] = useState({
        main: null,
        list: null,
    });
    const onSubmit = async (form) => {
        console.log("submit");

        const result = {
            ...form,
            colors: convertOptions(form.colors),
            colors_en: convertOptions(form.colors_en),
            sizes: convertOptions(form.sizes),
            images,
        };

        console.log(result);
        const { data } = await axios.post("/api/v1/product/add", result);
    };

    const showImage = async (e) => {
        const files = e.target.files;
        let main, list;

        if (files.length === 1) {
            const url = URL.createObjectURL(files[0]);
            main = await convertBase64(files[0]);

            setMainImage(url);
            setImages((pre) => ({ ...pre, main }));

            return;
        }

        list = await Promise.all(
            Array.from(files).map((item) => convertBase64(item))
        );
        let base64s = [];
        for (let i = 0; i < files.length; i++) {
            base64s.push(URL.createObjectURL(files[i]));
        }
        console.log("set images");
        setListImage(base64s);
        setImages((pre) => ({ ...pre, list }));
    };
    // console.log(image)
    const [specs, setSpecs] = useState([
        "category",
        "weight",
        "material",
        "sale",
    ]);

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    return (
        <Box m="20px" pb={"100px"}>
            <Header
                title="SẢN PHẨM"
                subtitle="List of Contacts for Future Reference"
            />
            <Divider />
            {/* <Avatar
                src={main ?? "/broken-image.jpg"}
                className="img-main"
                sx={{ width: "200px", height: "200px" }}
            /> */}
            <Box component={"form"} onSubmit={handleSubmit(onSubmit)}>
                {!!mainImage && (
                    <Avatar
                        variant="square"
                        src={mainImage}
                        className="img-main"
                        sx={{ width: "200px", height: "200px" }}
                    />
                )}
                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Hình ảnh Chính
                    <VisuallyHiddenInput
                        type="file"
                        multiple
                        name={"file"}
                        onChange={showImage}
                    />
                </Button>
                {!!listImage.length && imageList(listImage)}

                <Button
                    component="label"
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                >
                    Hình ảnh bổ sung
                    <VisuallyHiddenInput
                        type="file"
                        multiple
                        name={"file"}
                        onChange={showImage}
                    />
                </Button>
                <Box sx={{ display: "flex", gap: 2 }}>
                    {/* Tiếng Việt */}
                    <Box sx={{ flex: "50%" }}>
                        <CustomTextField
                            helperText="Tên sản phẩm"
                            required
                            name={"name"}
                            register={register}
                            errors={errors}
                        />
                        <CustomTextField
                            helperText="Giá"
                            required
                            name={"price"}
                            register={register}
                            errors={errors}
                        />
                        <CustomTextField
                            helperText="Thương hiệu"
                            required
                            name={"brand"}
                            register={register}
                            errors={errors}
                        />
                        <CustomTextField
                            helperText="Mô tả sản phẩm"
                            required
                            name={"description"}
                            register={register}
                            errors={errors}
                        />

                        <CustomTextField
                            helperText="Màu sắc"
                            required
                            name={"colors"}
                            register={register}
                            errors={errors}
                        />
                        <CustomTextField
                            helperText="Kích cỡ sản phẩm"
                            required
                            name={"sizes"}
                            register={register}
                            errors={errors}
                        />
                        <CustomTextField
                            helperText="Số lượng có sẵn"
                            required
                            name={"inventory"}
                            register={register}
                            errors={errors}
                        />
                        <Typography sx={{ mb: 1.5 }}>
                            Các thuộc tính khác
                        </Typography>
                        <Box>
                            {specs.map((item, index) => {
                                return (
                                    <Box
                                        key={index}
                                        sx={{ display: "flex", gap: 2, mt: 2 }}
                                    >
                                        <Typography
                                            variant="subtitle1"
                                            sx={{ flex: "20%" }}
                                        >
                                            {item}
                                            {handleAdornment(item)}
                                        </Typography>
                                        <CustomTextField
                                            // helperText="Số lượng có sẵn"
                                            // required
                                            name={item}
                                            register={register}
                                            errors={errors}
                                        />
                                    </Box>
                                );
                            })}
                        </Box>
                    </Box>
                    {/* Tiếng anh */}
                    <Box sx={{ flex: "50%" }}>
                        <CustomTextField
                            helperText="Name"
                            required
                            name={"name_en"}
                            register={register}
                            errors={errors}
                        />
                        <CustomTextField
                            helperText="Price"
                            required
                            name={"price_en"}
                            register={register}
                            errors={errors}
                        />
                        <CustomTextField
                            helperText="Brand"
                            required
                            name={"brand_en"}
                            register={register}
                            errors={errors}
                        />
                        <CustomTextField
                            helperText="Description"
                            required
                            name={"description_en"}
                            register={register}
                            errors={errors}
                        />

                        <CustomTextField
                            helperText="Colors"
                            required
                            name={"colors_en"}
                            register={register}
                            errors={errors}
                        />
                    </Box>
                </Box>
                <Box display={"flex"} sx={{ justifyContent: "center" }}>
                    <Button
                        variant="outlined"
                        size="large"
                        color="info"
                        sx={{ mt: 3, px: "100px" }}
                        type="submit"
                    >
                        Thêm sản phẩm
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default AddProduct;

function handleAdornment(item) {
    switch (item) {
        case "Sale":
        case "sale":
            return " (%)";
            break;
        case "weight":
            return " (gram)";
            break;
        default:
            return "";
    }
}

function convertOptions(opt) {
    return opt
        .trim()
        .split(",")
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1));
}

function uploadSingleImage(image) {
    axios
        .post("/api/v1/admin/products/add/base64/single", {
            image,
        })
        .then((res) => {
            console.log(res.data);
        })
        .catch(console.log);
}
function uploadMultipleImages(images) {
    axios
        .post("/api/v1/admin/products/add/base64/multiple", { images })
        .then((res) => {
            console.log(res);
        })
        .catch(console.log);
}
