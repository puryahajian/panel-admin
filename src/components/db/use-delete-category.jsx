import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idCategoryDelete }) => {
            const res = await interceptor.delete(`product/api/v1/category/${idCategoryDelete}/`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['deleteCategory'] });
        },
    });
}

export default UseDeleteCategory
