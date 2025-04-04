import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UsePostDeleteNewVisit() {
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
                queryClient.invalidateQueries(['newVisitDelete']);
            }
        }
    );

    return mutation;
}

export default UsePostDeleteNewVisit
