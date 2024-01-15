import React, { lazy, useEffect, useState } from "react";
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
export const renderTextField = (label, content, index, sx = {}) => (
    <Box key={index} component={"section"} sx={{ mb: 3 }}>
        <InputLabel variant="standard" htmlFor="uncontrolled-native">
            {label}
        </InputLabel>
        <Typography sx={sx} component={"span"} variant="h5">
            {content}
        </Typography>
    </Box>
);

export const renderImages = ({ main, list }, index) => (
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

export const renderSpecial = (specs) =>
    specs.map(({ key, value }, index) => renderTextField(key, value, index));

export const renderOptions = (options) =>
    options.map(({ key, value }, index) =>
        renderTextField(key, value.toString(), index)
    );
