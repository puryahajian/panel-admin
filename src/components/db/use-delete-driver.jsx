import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function UseDeleteDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({idDelete}) => {

            const res = await interceptor.delete(`courier/api/v1/cashier/riders/${idDelete}/`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('deleteDriver');
        },
    });
}

export default UseDeleteDriver
