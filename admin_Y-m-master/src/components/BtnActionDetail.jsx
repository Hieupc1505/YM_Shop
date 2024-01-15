import React from "react";
import EditNoteIcon from "@mui/icons-material/EditNote";
import DeleteIcon from "@mui/icons-material/Delete";
import { Button, Stack } from "@mui/material";
const BtnActionDetail = ({ handleDelete, handleEdit, edit, deleted }) => {
    edit = edit ?? false;
    deleted = deleted ?? false;
    return (
        <Stack direction={"row"} gap={1.5} sx={{ mt: 2, mb: 3 }}>
            <Button
                variant="outlined"
                startIcon={<EditNoteIcon />}
                size="medium"
                sx={{ px: 3 }}
                onClick={handleEdit}
                disabled={edit}
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
                disabled={deleted}
            >
                Xóa
            </Button>
        </Stack>
    );
};

export default BtnActionDetail;
