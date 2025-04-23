import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import { useParams } from 'react-router-dom';

function UsePostSendMessage() {
    const queryClient = useQueryClient();
    const {id} = useParams();
    const mutation = useMutation(
        async ({ message, fileName }) => {

            const formData = new FormData();
            formData.append('content', message);
            formData.append('media', fileName);
            
            const response = await interceptor.post(`doctor-request/user-visit/${id}/send-message/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['sendMessage']);
                console.log(data)
            },
        }
    );
    return mutation;
}

export default UsePostSendMessage
