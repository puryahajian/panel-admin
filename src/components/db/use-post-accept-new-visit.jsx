import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function UsePostAcceptNewVisit() {
    const queryClient = useQueryClient();
    const mutation = useMutation(
        async ({ itemId }) => {

            const response = await interceptor.post(`doctor/new-visit/${itemId}/`);
            return response.data;
        },
        {
            onError: (error) => {
                console.log("Verification Error:", error.message);
            },
            onSuccess: (data) => {
                console.log(data)
                queryClient.invalidateQueries(['newVisitAccept']);
            }
        }
    );

    return mutation;
}

export default UsePostAcceptNewVisit
