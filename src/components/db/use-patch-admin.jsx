import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function usePatchAdmin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({nameAdmin, familyAdmin,addressAdmin, phoneAdmin,id}) => {

            let data = JSON.stringify({
                "user": {
                    "phone": phoneAdmin,
                    "name": nameAdmin,
                    "family": familyAdmin,
                    "address": addressAdmin
                },
                "state": 6
            })

            const res = await interceptor.patch(`cashier/api/v1/cashiers/${id}/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allAdmin')
        },
    });
}

export default usePatchAdmin
