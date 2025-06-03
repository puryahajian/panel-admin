import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useDeleteCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ selectIdCustomer }) => {

            const res = await interceptor.delete(`cashier/api/v1/customers/${selectIdCustomer}/`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries(['allCustomer']);
        },
    });
}

export default useDeleteCustomer
