import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function UsePatchDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({nameDriver,phoneDriver,addressDriver, id}) => {

            const data = JSON.stringify({
                name: nameDriver,
                phone: phoneDriver,
                address: addressDriver,
            });

            const res = await interceptor.patch(`courier/api/v1/cashier/riders/${id}/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('patchDriver');
        },
    });
}

export default UsePatchDriver
