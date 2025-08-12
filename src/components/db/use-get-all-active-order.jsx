import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function useGetAllActiveOrder() {

    const { data, error, isLoading } = useQuery({
        queryKey: ['activeOrder'],
        queryFn: async () => {
          const response = await interceptor.get('order/admin/v1/orders/');
          return response.data;
        },
    });

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default useGetAllActiveOrder
