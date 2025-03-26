import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetTransaction() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['transaction'],
        queryFn: async () => {
          const response = await interceptor.get('shop/transactions');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['transaction'])
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['transaction'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetTransaction
