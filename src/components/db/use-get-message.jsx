import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';
import { useParams } from 'react-router-dom';

function UseGetMessage() {
    const queryClient = useQueryClient();
    const {id} = useParams();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getMessage'],
        queryFn: async () => {
            const response = await interceptor.get(`doctor-request/doctor-visit/${id}/chats/`);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getMessage']);
        },
        onError: (error) => {
            console.log('Error fetching data:', error);
        },
    });
    
    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['getMessage']);
        }
    }, [data]); 

    if (isLoading) return <div>Loading...</div>;

    if (error){ return <div>Error: {error?.message}</div>};

    return {data}
}

export default UseGetMessage
