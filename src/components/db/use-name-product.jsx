import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseNameProduct() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['allNameProduct'],
        queryFn: async () => {
          const response = await interceptor.get('product/api/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['allNameProduct'])
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['allNameProduct'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseNameProduct
