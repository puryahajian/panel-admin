import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useDeleteProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ selectedItemId }) => {
            const res = await interceptor.delete(`product/api/v1/product/${selectedItemId}/`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allProduct')
        },
    });
}

export default useDeleteProduct
