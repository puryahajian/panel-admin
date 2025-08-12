import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useDeleteDiscount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ id }) => {

            const res = await interceptor.delete(`discount/admin/api/v1/${id}/`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allDescription');
        },
    });
}

export default useDeleteDiscount
