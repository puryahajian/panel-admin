import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';
// import interceptor from '../lib/interceptor';

function UseGetNewVisit() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getNewVisit'],
        queryFn: async () => {
            const response = await interceptor.get(`course/user-course`);
            return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getNewVisit']);
        },
        onError: (error) => {
            console.log('Error fetching data:', error);
        },
    });
    
    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['getNewVisit']);
        }
    }, [data]); 

    if (isLoading) return <div>Loading...</div>;

    if (error){ return <div>Error: {error?.message}</div>};

    return {data}
}

export default UseGetNewVisit
