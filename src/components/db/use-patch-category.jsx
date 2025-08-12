import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function usePatchCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ selectedCategory, nameCategory, openSelected, preview }) => {
            // console.log(selectedCategory, nameCategory, openSelected, preview)
            const formData = new FormData();
            // if (nameCategory) formData.append('image', nameCategory);
            if (nameCategory) formData.append('name', nameCategory);
            if (preview) formData.append('image', preview);

            const res = await interceptor.patch(`product/admin/api/v1/categories/${openSelected}/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allCategory');
        },
    });
}

export default usePatchCategory
