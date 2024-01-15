import { Stack, Box, Chip } from "@mui/material";
import React from "react";

const HandleColors = ({ colors }) => {
    return (
        <Stack direction={"row"} spacing={{ xs: 0.1 }}>
            {colors["value"].map((item, index) => (
                <Chip key={index} variant="outline" label={item} />
            ))}
        </Stack>
    );
};

export default React.memo(HandleColors);
