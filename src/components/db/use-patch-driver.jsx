import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function usePatchDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({nameDriver,phoneDriver,addressDriver, id,inState}) => {

            const data = JSON.stringify({
                name: nameDriver,
                phone: phoneDriver,
                address: addressDriver,
                in_process: inState
            });

            const res = await interceptor.patch(`courier/api/v1/cashier/riders/${id}/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allRider');
        },
    });
}

export default usePatchDriver
