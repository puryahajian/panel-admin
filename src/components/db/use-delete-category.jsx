import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useDeleteCategory() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idCategoryDelete }) => {
            const res = await interceptor.delete(`product/api/v1/category/${idCategoryDelete}/`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allCategory');
        },
    });
}

export default useDeleteCategory
