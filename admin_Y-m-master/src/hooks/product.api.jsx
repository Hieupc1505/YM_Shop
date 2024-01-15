import axios from "axios";

const productAPI = {
    // addOrder: async()
    getFullInfo: async (productId) => {
        const { data } = await axios.post("/api/v1/product/full", {
            productId,
        });
        return data?.element;
    },
};

export default productAPI;
