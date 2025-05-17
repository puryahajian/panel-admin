import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseCreateCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ nameCustomer, numberCustomer, addressCustomer, lastNameCustomer}) => {

            const formData = new FormData();
            formData.append('name', nameCustomer || '');
            formData.append('phone', numberCustomer || '');
            formData.append('family', lastNameCustomer || '');
            formData.append('address', addressCustomer || '');

            const res = await interceptor.post(`cashier/api/v1/customers/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('createCustomer');
        },
    });
}

export default UseCreateCustomer
