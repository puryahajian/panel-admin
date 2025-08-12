import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function useCreateTicket() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ titleForm, selectorCategory, activeId, detail }) => {

            const data = JSON.stringify({
                title: titleForm,
                section: selectorCategory,
                priority: activeId,
                description: detail
            })

            const res = await interceptor.post(`ticket/api/v1/admin/tickets/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            // console.log(data)
            queryClient.removeQueries('allTickets');
        },
        onError: (err) => {
            console.log(err)
        }
    });
}

export default useCreateTicket
