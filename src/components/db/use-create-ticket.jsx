import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import qs from "qs";
import interceptor from '../../lib/interceptor';

function UseCreateTicket() {
    const queryClient = useQueryClient();
    
    const mutation = useMutation(
        async ({ section, description ,selectedFile, title}) => {

            const formData = new FormData();
            formData.append('title', title);
            formData.append('section', section);
            formData.append('media', selectedFile);
            formData.append('description', description);
            
            const response = await interceptor.post(`ticket/tickets/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
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
