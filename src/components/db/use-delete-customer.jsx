import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseDeleteCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ selectIdCustomer }) => {

            const res = await interceptor.post(`cashier/api/v1/customers/${selectIdCustomer}/`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['deleteCustomer'] });
        },
    });
}

export default UseDeleteCustomer
