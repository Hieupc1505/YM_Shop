import { Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const ProductName = ({ id, list }) => {
    const [data, setData] = useState(() => {
        return list.filter((item) => item._id === id);
    });
    const navigate = useNavigate();
    const handleClick = () => {
        navigate("/products", { state: { id } });
    };
    return (
        <>
            {!!data &&
                data.map((item, index) => (
                    <Typography
                        sx={{
                            cursor: "pointer",
                            "&:hover": {
                                color: "green",
                            },
                        }}
                        onClick={handleClick}
                        key={index}
                    >
                        {item?.name?.vn}
                    </Typography>
                ))}
        </>
    );
};

export default React.memo(ProductName);
