import React from "react";
import { Box, Button } from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";

const BtnSubmit = ({ size = "medium", sx = {}, loading = false }) => {
    return (
        <Box display={"flex"} sx={{ justifyContent: "center" }}>
            <Button
                size={size}
                type="submit"
                sx={
                    loading
                        ? { ...disabledStyle, ...sx }
                        : { ...normalStyle, ...sx }
                }
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
                Cập nhập thông tin sản phẩm
            </Button>
        </Box>
    );
};

export default BtnSubmit;

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
