import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function useDeleteDriver() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({idDelete}) => {
            const res = await interceptor.delete(`courier/admin/api/v1/${idDelete}`);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allRider');
        },
        onError: (err) => {
            console.log(err)
        }
    });
}

export default useDeleteDriver
