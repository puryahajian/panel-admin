import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetSection() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getSection'],
        queryFn: async () => {
            const response = await interceptor.get(`ticket/ticket-sections/`);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getSection']);
        },
        onError: (error) => {
            console.log('Error fetching data:', error);
        },
    });
    
    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['getSection']);
        }
    }, [data]); 

    if (isLoading) return <div>Loading...</div>;

    if (error){ return <div>Error: {error?.message}</div>};

    return {data}
}

export default UseGetSection
