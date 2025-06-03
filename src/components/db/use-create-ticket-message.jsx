import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import { useParams } from 'react-router-dom';

function useCreateTicketMessage() {
    const queryClient = useQueryClient();
    const { id } = useParams();


    return useMutation({
        mutationFn: async ({ selectedFile, message,}) => {

            const formData = new FormData();
            formData.append('text', message || '');
            formData.append('file', selectedFile || '');

            const res = await interceptor.post(`ticket/api/v1/tickets/${id}/messages/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('createTicketMessage');
        },
    });
}

export default useCreateTicketMessage
