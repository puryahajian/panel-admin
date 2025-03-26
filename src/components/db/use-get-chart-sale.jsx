import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetChartSale() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['chartSale'],
        queryFn: async () => {
          const response = await interceptor.get('shop/sales-stats/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['chartSale'])
        },

    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['chartSale'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetChartSale
