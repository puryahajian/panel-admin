import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function UsePatchAdmin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({nameAdmin, familyAdmin,addressAdmin, phoneAdmin,id}) => {

            const data = JSON.stringify({
                name: nameAdmin,
                family: familyAdmin,
                phone: phoneAdmin,
                address: addressAdmin,
            });

            const res = await interceptor.patch(`courier/api/v1/cashier/riders/${id}/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allAdmin')
        },
    });
}

export default UsePatchAdmin
