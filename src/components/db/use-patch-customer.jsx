import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function usePatchCustomer() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ nameCustomer, lastNameCustomer, numberCustomer, addressCustomer, selectIdEdit}) => {

            const data = JSON.stringify({
                name: nameCustomer || '',
                family: lastNameCustomer || '',
                phone: numberCustomer || '',
                address: addressCustomer || ''
            })

            const res = await interceptor.patch(`cashier/admin/api/v1/customers/${selectIdEdit}/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allCustomer');
        },
        onError: (err) => {
            console.log(err)
        }
    });
}

export default usePatchCustomer
