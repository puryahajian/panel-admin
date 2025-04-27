import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import qs from "qs";
import interceptor from '../../lib/interceptor';

function UseCreateTicket() {
    const queryClient = useQueryClient();
    
    const mutation = useMutation(
        async ({ section, description , title}) => {

            const data = qs.stringify({
                description: description,
                section: section,
                title: title
            });
            
            const response = await interceptor.post(`ticket/tickets/`, data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['createTicket']);
            },
        }
    );
    
    return mutation;
}

export default UseCreateTicket
