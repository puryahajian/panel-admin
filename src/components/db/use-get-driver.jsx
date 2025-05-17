import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetDriver() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
          const response = await interceptor.get('courier/api/v1/cashier/riders/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allProduct')
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries('allProduct')
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}}

export default UseGetDriver
