import React from "react";
import {
    Box,
    IconButton,
    Typography,
    Stack,
    Button,
    TextField,
    InputLabel,
} from "@mui/material";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { Label } from "@mui/icons-material";
import axios from "axios";
const Detail = ({ handleDelete, handleEdit, children }) => {
    const boxWrap = {
        padding: "48px 32px 24px",
    };

    return (
        <Box sx={boxWrap}>
            <Box sx={{ display: "flex" }}>
                <IconButton
                    variant="outlined"
                    sx={{ border: "1px solid green" }}
                >
                    <ChevronRightIcon />
                </IconButton>
                <Typography variant="h2" ml={2}>
                    Chi Tiết
                </Typography>
            </Box>
            {/* <Stack direction={"row"} gap={1.5} sx={{ mt: 2, mb: 3 }}>
                <Button
                    variant="outlined"
                    startIcon={<EditNoteIcon />}
                    size="medium"
                    sx={{ px: 3 }}
                    onClick={handleEdit}
                >
                    Sửa
                </Button>
                <Button
                    variant="outlined"
                    startIcon={<DeleteIcon />}
                    size="medium"
                    color={"error"}
                    sx={{ px: 3 }}
                    onClick={handleDelete}
                >
                    Xóa
                </Button>
            </Stack> */}
            {children}
        </Box>
    );
};

export default Detail;
