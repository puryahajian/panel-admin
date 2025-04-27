import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetProfileDoctor() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getProfileDoctor'],
        queryFn: async () => {
            const response = await interceptor.get(`doctor/profile/`);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getProfileDoctor']);
        },
        onError: (error) => {
            console.log('Error fetching data:', error);
        },
    });
    
    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['getProfileDoctor']);
        }
    }, [data]); 

    if (isLoading) return <div>Loading...</div>;

    if (error){ return <div>Error: {error?.message}</div>};

    return {data}
}

export default UseGetProfileDoctor
