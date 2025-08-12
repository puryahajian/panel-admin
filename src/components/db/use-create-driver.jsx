import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function useCreateDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({nameDriver, phoneDriver, addressDriver}) => {

            const data = JSON.stringify({
                name: nameDriver,
                phone: phoneDriver,
                address: addressDriver,
            });

            const res = await interceptor.post(`courier/admin/api/v1/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allRider');
        },
    });
}

export default useCreateDriver
