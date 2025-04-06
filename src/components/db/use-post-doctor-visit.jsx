import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import { useParams } from 'react-router-dom';

function UsePostDoctorVisit() {
    const queryClient = useQueryClient();
    const {id} = useParams();


    const mutation = useMutation(
        async ({ description,selectedFile }) => {

            const formData = new FormData();
            formData.append('content', description);
            formData.append('media', selectedFile);
            
            const response = await interceptor.post(`doctor-request/doctor-visit/${id}/send-message/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log(data)
                queryClient.invalidateQueries(['create-visit']);
            },
        }
    );
    return mutation;

}

export default UsePostDoctorVisit
