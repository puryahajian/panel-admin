import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ nameCategory, selectedCategory }) => {

            const formData = new FormData();
            formData.append('name', nameCategory);
            formData.append('image', selectedCategory);

            const res = await interceptor.post(`product/api/v1/category/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allCategory')        
        },
    });
}

export default UseCreateCategory
