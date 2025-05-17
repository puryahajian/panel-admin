import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseDeleteAdmin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({id}) => {

            const res = await interceptor.delete(`cashier/api/v1/customers/${id}/`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('deleteAdmin');
        },
    });
}

export default UseDeleteAdmin
