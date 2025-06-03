import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useDeleteAdmin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id}) => {
            const res = await interceptor.delete(`cashier/api/v1/cashiers/${id}/`);
            return res.data;
        },
        onSuccess: (data) => {
            // console.log(data)
        },
        onError: (err) => {
            queryClient.removeQueries('allAdmin');
            // console.log(err)
            // queryClient.removeQueries('allAdmin');
        },
        
    });
}

export default useDeleteAdmin
