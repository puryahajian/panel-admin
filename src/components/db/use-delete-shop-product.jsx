
import { useMutation, useQueryClient } from "@tanstack/react-query";
import interceptor from "../../lib/interceptor";

const UseDeleteShopProduct = () => {
    const queryClient = useQueryClient();

    const mutation = useMutation(
        async ({ selectedProductId }) => {
            const response = await interceptor.delete(`shop/products/delete/${selectedProductId}/`);
            return response.data;
        },
        {
            onSuccess: () => {
                queryClient.invalidateQueries(['shop-products']);
            },
            onError: (error) => {
                console.log("خطا در حذف محصول:", error.message);
            },
        }
    );

    return mutation;
};

export default UseDeleteShopProduct;