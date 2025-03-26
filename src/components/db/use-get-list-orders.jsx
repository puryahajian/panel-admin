import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetListOrders() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['listOrders'],
        queryFn: async () => {
          const response = await interceptor.get('shop/baskets/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['listOrders'])
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['listOrders'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetListOrders
