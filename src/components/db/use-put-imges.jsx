import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import { toast } from 'react-toastify';

function usePutImages() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({item, file}) => {
            // console.log(item)
            const formData = new FormData();
            if (file) formData.append('image', file);

            const res = await interceptor.patch(`product/admin/api/v1/product-images/${item?.id}/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success('عکس جدید اپلود شد')
            queryClient.removeQueries('allProduct')
        },
        onError: (err) => {
            // console.log(err)
        }
    });
}

export default usePutImages
