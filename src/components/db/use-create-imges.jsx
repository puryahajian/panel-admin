import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import { toast } from 'react-toastify';

function useCreateImages() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({file, selectedItem, index, alt = 'q', title = 'q'}) => {
            const formData = new FormData();
            if (file) formData.append('image', file);
            if (index) formData.append('order', index);
            if (alt) formData.append('alt', alt);
            if (title) formData.append('title', title);

            const res = await interceptor.post(`product/admin/api/v1/products/${selectedItem?.id}/images/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            // console.log(data)
            toast.success('عکس جدید اپلود شد')
            queryClient.invalidateQueries('allProduct')
        },
        onError: (err) => {
            // console.log(err)
        }
    });
}

export default useCreateImages
