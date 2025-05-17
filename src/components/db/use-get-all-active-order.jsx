import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetAllActiveOrder() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['activeOrder'],
        queryFn: async () => {
          const response = await interceptor.get('order/api/v1/active-orders/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('activeOrder')
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries('activeOrder')
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetAllActiveOrder
