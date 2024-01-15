import React, { ReactNode, useEffect, useState } from "react";
import {
    FormControl,
    FormHelperText,
    Typography,
    TextField,
    InputAdornment,
    // SxProps,
} from "@mui/material";

const CustomTextField = ({
    label,
    helperText,
    required = false,
    name,
    endIcon,
    startIcon,
    register = () => {
        return;
    },
    disabled,
    sx,
    value,
    errors,
    readOnly,
}) => {
    const handelInputProps = () => {
        const result = { readOnly: readOnly ?? false };
        if (endIcon)
            result["endAdorment"] = (
                <InputAdornment position="end">{endIcon}</InputAdornment>
            );

        if (startIcon)
            result["startAdorment"] = (
                <InputAdornment position="end">{endIcon}</InputAdornment>
            );

        return result;
    };
    // const [defaultValue, setDefaultValue] = useState("");
    // useEffect(() => {
    //     if(value)
    //     setDefaultValue((pre) => (!!value ? value : pre));
    // }, [value]);

    return (
        <FormControl sx={{ width: "100%", ...sx }}>
            {!label && (
                <FormHelperText id={label} sx={{ mx: 0 }}>
                    {helperText}{" "}
                    {required && (
                        <Typography component={"span"} color={"red"}>
                            *
                        </Typography>
                    )}
                </FormHelperText>
            )}

            <TextField
                required={required}
                id="outlined-required"
                label={label}
                // name={name}
                defaultValue={value}
                InputProps={handelInputProps()}
                disabled={disabled}
                {...register(name)}
                error={errors && errors[name] ? true : false}
                helperText={errors && errors[name]?.message}
            />
        </FormControl>
    );
};

export default React.memo(CustomTextField);
