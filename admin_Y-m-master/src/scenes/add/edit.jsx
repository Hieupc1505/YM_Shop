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
    TextField,
} from "@mui/material";
// import LoadingButton from "@mui/lab/LoadingButton";
import Header from "../../components/Header";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useEffect, useState } from "react";
import axios from "axios";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import CircularProgress from "@mui/material/CircularProgress";

import InputLabel from "@mui/material/InputLabel";
import FormControl from "@mui/material/FormControl";
import NativeSelect from "@mui/material/NativeSelect";
import EmptyTextarea from "./TextareaAutosize";
import CustomTextField from "~/components/CustomTextField";
import { useParams } from "react-router-dom";
import productAPI from "~/hooks/product.api";
import AddIcon from "@mui/icons-material/Add";
import { useNavigate } from "react-router-dom";

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
}

const EditProduct = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [list, setList] = useState(null);
    const handleFileInputChangev2 = (e) => {
        const reader = new FileReader();
    };

    const [initData, setInitData] = useState(null);

    const { id } = useParams();

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
        name: Yup.string().required().max(250, "Họ không vượt quá 64 kí tự"),
        price: Yup.string().required().max(250, "Tên không vượt quá 64 kí tự"),
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

    const [specs, setSpecs] = useState([]);

    const onSubmit = async (form) => {
        console.log("submit");
        const preImages = initData.images;
        // const result = {
        //     ...form,
        //     colors: convertOptions(form.colors),
        //     colors_en: convertOptions(form.colors_en),
        //     sizes: convertOptions(form.sizes),
        //     images,
        //     preImages: initData.images,
        // };

        const result2 = {
            name: {
                en: form.name_en,
                vn: form.name,
            },
            price: {
                en: form.price_en,
                vn: form.price,
            },
            description: {
                en: form.description,
                vn: form.description,
            },
            brand: {
                en: form.brand_en,
                vn: form.brand,
            },
            images,
            options: [
                {
                    key: "colors",
                    value: {
                        en: convertOptions(form["colors_en"]),
                        vn: convertOptions(form["colors"]),
                    },
                    label: {
                        en: "Colors",
                        vn: "Màu sắc",
                    },
                },
                {
                    key: "sizes",
                    value: convertOptions(form["sizes"]),
                    label: {
                        en: "Sizes",
                        vn: "Kích thước",
                    },
                },
            ],
            specs: [
                {
                    key: "category",
                    label: {
                        en: "Category",
                        vn: "Thể loại",
                    },
                    value: form["category"] ?? "",
                },
                {
                    key: "weight",
                    label: {
                        en: "Weight",
                        vn: "Trọng lượng",
                    },
                    value: form["weight"] ?? 200,
                },
                {
                    key: "material",
                    label: {
                        en: "material",
                        vn: "Chất liệu",
                    },
                    value: form["material"] ?? "cotton",
                },
                ...specs.map((item) => ({
                    key: item,
                    value: form[item],
                    label: generateLabel(item),
                })),
            ],
        };
        setLoading(true);
        const { data } = await axios.post("/api/v1/product/edit", {
            productId: id,
            product: result2,
            inventory: {
                ...initData.inventory,
                quantity: form["inventory"],
            },
            preImages,
        });

        console.log(data);
        if (data && data.success) {
            setLoading(false);
            navigate("/products", { state: { id: data.element.productId } });
        }
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

    const handleChange = (event) => {
        setAge(event.target.value);
    };

    useEffect(() => {
        const fetchData = async () => {
            const result = await productAPI.getFullInfo(id);
            if (result) {
                setMainImage(() => result.images.main);
                setListImage(() => result.images.list);

                setInitData(result);
            }
        };
        fetchData();
    }, [id]);

    const [field, setField] = useState("");
    const onChangeField = (e) => {
        setField(e.target.value);
    };

    const handleAddField = () => {
        if (field !== "") setSpecs((pre) => [...pre, field]);
    };

    const handleClick = () => {
        setLoading((pre) => !pre);
    };

    return (
        <Box m="20px" pb={"100px"}>
            <Header
                title="CẬP NHẬP THÔNG TIN SẢN PHẨM"
                subtitle="List of Contacts for Future Reference"
            />
            <Divider />

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
                        {!!initData && (
                            <>
                                <CustomTextField
                                    helperText="Tên sản phẩm"
                                    required
                                    name={"name"}
                                    register={register}
                                    errors={errors}
                                    value={initData?.name?.vn ?? ""}
                                />
                                <CustomTextField
                                    helperText="Giá"
                                    required
                                    name={"price"}
                                    register={register}
                                    errors={errors}
                                    value={initData?.price?.vn}
                                />
                                <CustomTextField
                                    helperText="Thương hiệu"
                                    required
                                    name={"brand"}
                                    register={register}
                                    errors={errors}
                                    value={initData?.brand?.vn}
                                />
                                <CustomTextField
                                    helperText="Mô tả sản phẩm"
                                    required
                                    name={"description"}
                                    register={register}
                                    errors={errors}
                                    value={initData?.description?.vn}
                                />

                                <CustomTextField
                                    helperText="Màu sắc"
                                    required
                                    name={"colors"}
                                    register={register}
                                    errors={errors}
                                    value={initData?.options[0].value.vn.toString()}
                                />
                                <CustomTextField
                                    helperText="Kích cỡ sản phẩm"
                                    required
                                    name={"sizes"}
                                    register={register}
                                    errors={errors}
                                    value={initData?.options[1].value.toString()}
                                />
                                <CustomTextField
                                    helperText="Số lượng có sẵn"
                                    required
                                    name={"inventory"}
                                    register={register}
                                    errors={errors}
                                    value={initData?.inventory.quantity}
                                />
                                <Box
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        my: 1.5,
                                    }}
                                >
                                    <Typography sx={{ minWidth: "150px" }}>
                                        Các thuộc tính khác
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            alignItems: "center",
                                            gap: 2,
                                        }}
                                    >
                                        <TextField
                                            name="field"
                                            size="small"
                                            value={field}
                                            onChange={onChangeField}
                                        />
                                        <Button
                                            startIcon={<AddIcon />}
                                            color="warning"
                                            onClick={handleAddField}
                                        >
                                            Thêm
                                        </Button>
                                    </Box>
                                </Box>
                                <Box>
                                    {initData.specs.map((item, index) => {
                                        return (
                                            <Box
                                                key={index}
                                                sx={{
                                                    display: "flex",
                                                    gap: 2,
                                                    mt: 2,
                                                }}
                                            >
                                                <Typography
                                                    variant="subtitle1"
                                                    sx={{ flex: "20%" }}
                                                >
                                                    {item.key}
                                                    {handleAdornment(item.key)}
                                                </Typography>
                                                <CustomTextField
                                                    // helperText="Mô tả sản phẩm"
                                                    // required
                                                    name={item.key}
                                                    register={register}
                                                    errors={errors}
                                                    value={item.value}
                                                />
                                            </Box>
                                        );
                                    })}
                                    {specs.map((item, index) => (
                                        <Box
                                            key={index}
                                            sx={{
                                                display: "flex",
                                                gap: 2,
                                                mt: 2,
                                            }}
                                        >
                                            <Typography
                                                variant="subtitle1"
                                                sx={{ flex: "20%" }}
                                            >
                                                {item}
                                                {handleAdornment(item)}
                                            </Typography>
                                            <CustomTextField
                                                // helperText="Mô tả sản phẩm"
                                                // required
                                                name={item}
                                                register={register}
                                                errors={errors}
                                            />
                                        </Box>
                                    ))}
                                </Box>
                            </>
                        )}
                    </Box>
                    {/* Tiếng anh */}
                    <Box sx={{ flex: "50%" }}>
                        {!!initData && (
                            <>
                                <CustomTextField
                                    helperText="Name"
                                    required
                                    name={"name_en"}
                                    register={register}
                                    errors={errors}
                                    value={initData.name.en}
                                />
                                <CustomTextField
                                    helperText="Price"
                                    required
                                    name={"price_en"}
                                    register={register}
                                    errors={errors}
                                    value={initData.price.en}
                                />
                                <CustomTextField
                                    helperText="Brand"
                                    required
                                    name={"brand_en"}
                                    register={register}
                                    errors={errors}
                                    value={initData.brand.en}
                                />
                                <CustomTextField
                                    helperText="Description"
                                    required
                                    name={"description_en"}
                                    register={register}
                                    errors={errors}
                                    value={initData.description.en}
                                />

                                <CustomTextField
                                    helperText="Colors"
                                    required
                                    name={"colors_en"}
                                    register={register}
                                    errors={errors}
                                    value={initData?.options[0].value.en.toString()}
                                />
                            </>
                        )}
                    </Box>
                </Box>
                <Box display={"flex"} sx={{ justifyContent: "center" }}>
                    <Button
                        size="small"
                        type="submit"
                        sx={loading ? disabledStyle : normalStyle}
                        disabled={loading}
                        endIcon={
                            loading && (
                                <CircularProgress
                                    size={20}
                                    sx={{ color: "white", ml: 4 }}
                                />
                            )
                        }
                    >
                        Cập nhập thông tin
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default EditProduct;

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

function generateLabel(item) {
    switch (item.toLowerCase()) {
        case "sale":
            return { en: "Sale off", vn: "Giảm giá" };
            break;

        default:
            return { en: "", vn: "" };
    }
}

var normalStyle = {
    bgcolor: "info.main",
    color: "white",
    py: 0.75,
    px: 1.2,
    mt: 4,
    fontSize: "h6.fontSize",
    textTransform: "capitalize",
    minWidth: "400px",
    minHeight: "40px",
    "&:hover": {
        opacity: 0.8,
        color: "white",
        // borderColor: "orange.main",
        bgcolor: "info.main",
    },
};
var disabledStyle = {
    bgcolor: "text.disabled",
    color: "white",
    mt: 4,
    py: 0.75,
    px: 1.2,
    minWidth: "400px",
    minHeight: "40px",
    fontSize: "h6.fontSize",
    textTransform: "capitalize",
};
