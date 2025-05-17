import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function UseCreateDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({nameDriver, phoneDriver, addressDriver}) => {

            const data = JSON.stringify({
                name: nameDriver,
                phone: phoneDriver,
                address: addressDriver,
            });

            const res = await interceptor.post(`courier/api/v1/cashier/riders/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('createDriver');
        },
    });
}

export default UseCreateDriver
