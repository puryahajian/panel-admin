import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function usePatchCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ selectedCategory, nameCategory, openSelected }) => {

            const formData = new FormData();
            if (nameCategory) formData.append('name', nameCategory);
            if (selectedCategory) formData.append('image', selectedCategory);

            const res = await interceptor.patch(`product/api/v1/category/${openSelected}/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries(['allCategory']);
        },
    });
}

export default usePatchCategory
