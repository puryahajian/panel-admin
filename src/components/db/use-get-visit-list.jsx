import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetVisitList() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getVisitList'],
        queryFn: async () => {
            const response = await interceptor.get(`doctor/visit-list/`);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getVisitList']);
        },
        onError: (error) => {
            console.log('Error fetching data:', error);
        },
    });
    
    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['getVisitList']);
        }
    }, [data]); 

    if (isLoading) return <div>Loading...</div>;

    if (error){ return <div>Error: {error?.message}</div>};

    return {data}
}

export default UseGetVisitList
