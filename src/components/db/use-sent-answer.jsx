import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseSentAnswer() {
    const queryClient = useQueryClient();
    // const storedCoordinates = JSON.parse(localStorage.getItem('addressCoordinates'));
    // console.log('مختصات بازیابی‌شده از localStorage:', storedCoordinates);
    
    const mutation = useMutation(
        async ({ getIdTicket, fileName, valueMessage }) => {

            const formData = new FormData();
            formData.append('text', valueMessage);
            formData.append('file', fileName);
            
            const response = await interceptor.post(`ticket/tickets/${getIdTicket}/messages/`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log(data)
                // toast.success('پروفایل با موفقیت ذخیره شد')
                queryClient.invalidateQueries(['createNewProduct']);
            },
        }
    );
    
    return mutation;
}

export default UseSentAnswer
