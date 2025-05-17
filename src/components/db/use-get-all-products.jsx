import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function UseGetAllProducts() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
          const response = await interceptor.get('product/api/v1/product/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allProduct')
        },
    });

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetAllProducts
