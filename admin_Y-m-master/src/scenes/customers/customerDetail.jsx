import React, { useState, useEffect, Fragment, useCallback } from "react";
import { renderImages, renderTextField } from "~/components/TextField";
import { Avatar, Box, Typography, Stack, Button } from "@mui/material";
import adminAPI from "~/hooks/admin.api";
import { useLocation } from "react-router-dom";
import BtnActionDetail from "~/components/BtnActionDetail";
import { useNavigate } from "react-router-dom";

const CustomerDetail = ({ id }) => {
    const [data, setData] = useState(null);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            const { customer } = await adminAPI.getCustomerDetail(id);
            // console.log("data", data);

            setData(customer);
        };
        fetchData();
    }, [id]);

    const handleDelete = useCallback(() => {
        if (window.confirm("Bạn có chắc muốn xóa không??")) {
            const fetchData = async () => {
                const { data } = await axios.post("/api/v1/user/delete", {
                    id,
                });
                console.log(data);
                if (data && data.success) navigate("/customers", { state: {} });
            };
            fetchData();
        }
    }, [id]);

    const handleEdit = useCallback(() => {
        if (id) {
            navigate(`/customers/edit/${id}`, { state: { customer: data[0] } });
        } else {
            alert("Không có sản phẩm");
        }
    }, [id, data]);
    // console.log(data);

    return (
        <Box>
            <BtnActionDetail
                handleDelete={handleDelete}
                handleEdit={handleEdit}
                deleted={data && data[0]["isDeleted"]}
            />
            {!!data &&
                data.map((obj, index) => (
                    <Fragment key={index}>
                        {renderImages({ main: obj.avatar, list: [] }, 0)}
                        {Object.keys(obj).map(
                            (item, id) =>
                                !["avatar", "isDeleted"].includes(item) &&
                                renderTextField(item, obj[item], id)
                        )}
                    </Fragment>
                ))}
        </Box>
    );
};

export default CustomerDetail;
