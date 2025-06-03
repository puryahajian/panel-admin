import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function useCreateAdmin() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({nameAdmin, phone, gregorianBirthDay, firstNameAdmin, unitName,address, nCode}) => {
            const data = JSON.stringify({
                user: {
                    name: nameAdmin,
                    phone: phone,
                    birth_day: gregorianBirthDay.replaceAll('-', ''),
                    family: firstNameAdmin,
                    user_name: unitName,
                    address: address,
                },
                national_code: nCode,
                state: 4
            });

            const res = await interceptor.post(`cashier/api/v1/cashiers/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allAdmin')
        },
    });
}

export default useCreateAdmin
