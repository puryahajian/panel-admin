import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useDeleteImageProduct() {
   const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({idImage}) => {

            const res = await interceptor.delete(`product/admin/api/v1/product-images/${idImage}/`);
            return res.data;
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.removeQueries('allProduct');
        },
    });
}

export default useDeleteImageProduct
