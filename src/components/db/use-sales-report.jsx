import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseSalesReport() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['sale'],
        queryFn: async () => {
          const response = await interceptor.get('order/api/v1/sales-report/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('sale')
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries('sale')
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseSalesReport
