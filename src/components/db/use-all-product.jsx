import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseAllProduct() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
          const response = await interceptor.get('shop/products/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['allProduct'])
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['allProduct'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseAllProduct
