import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ bgProduct, nameProduct, priceProduct, selectorCategory, unitName }) => {

            const formData = new FormData();
            formData.append('name', nameProduct || '');
            formData.append('price', priceProduct || '');
            formData.append('unit_name', unitName || '');
            formData.append('category_id', selectorCategory || '');
            formData.append('image_url', bgProduct || '');

            const res = await interceptor.post(`product/api/v1/product/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allProduct')
        },
    });
}

export default UseCreateProduct
