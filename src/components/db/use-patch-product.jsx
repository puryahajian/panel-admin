import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UsePatchProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idEdit, selectorCategory, selectorState, nameEditProduct, priceEditProduct}) => {
            const formData = new FormData();
            formData.append('name', nameEditProduct);
            formData.append('price', priceEditProduct);
            formData.append('category_id', selectorCategory);
            formData.append('exist', selectorState);

            const res = await interceptor.patch(`product/api/v1/product/${idEdit}/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allProduct')
        },
    });
}

export default UsePatchProduct
