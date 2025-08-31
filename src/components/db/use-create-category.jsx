import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useCreateCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ nameCategory, selectedCategory, nameCategoryPersian ,priority}) => {

            const formData = new FormData();
            formData.append('name', nameCategory);
            formData.append('image', selectedCategory);
            formData.append('om_name', nameCategoryPersian);
            formData.append('order', priority);
            
            const res = await interceptor.post(`product/admin/api/v1/categories/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allCategory')        
        },
    });
}

export default useCreateCategory
