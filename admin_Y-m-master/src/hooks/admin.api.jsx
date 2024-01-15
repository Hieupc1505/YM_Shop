import axios from "axios";

const adminAPI = {
    getAdministrators: async () => {
        const { data } = await axios.get(`/api/v1/admin/administrators`);
        return data;
    },
    getAllProducts: async () => {
        const { data } = await axios.get(`/api/v1/admin/products`);
        return data;
    },
    getProductsByCategory: async (category) => {
        const { data } = await axios.post(`/api/v1/admin/categories`, {
            category,
        });
        return data;
    },
    getInfoProductByAdmin: async (id) => {
        const { data } = await axios.get(`/api/v1/product/${id}`);

        return data.element;
    },
    getOrders: async (id) => {
        const { data } = await axios.get(`/api/v1/admin/orders`);

        return data;
    },
    getOrderDetail: async (id) => {
        const { data } = await axios.get(
            `/api/v1/admin/orders/filter?id=${id}`
        );
        return data;
    },

    getAdminDetail: async (id) => {
        const { data } = await axios.post(
            `/api/v1/admin/administrators/filter`,
            {
                id,
            }
        );

        return data;
    },

    getCustomers: async () => {
        const { data } = await axios.get(`/api/v1/admin/customers`);
        return data;
    },

    getCustomerDetail: async (id) => {
        const { data } = await axios.post(`/api/v1/admin/customers/filter`, {
            id,
        });
        return data;
    },
    // addOrder: async()
};

export default adminAPI;
