import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import { useParams } from 'react-router-dom';

function useCreateTicketMessage() {
    const queryClient = useQueryClient();
    // const { id } = useParams();


    return useMutation({
        mutationFn: async ({ selectedFile, message,}) => {

            const formData = new FormData();
            formData.append('response_text', message || '');
            formData.append('response_images', selectedFile || '');

            const res = await interceptor.post(`tickets/api/v1/ticket/1/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            // console.log(data)
            queryClient.removeQueries('getTicketSingel');
        },
        onError: (err) => {
            // console.log(err)
        }
    });
}

export default useCreateTicketMessage
