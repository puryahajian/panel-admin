import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';
import { useQuery, useQueryClient } from '@tanstack/react-query';

function GetShopProduct() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['shopProduct'],
        queryFn: async () => {
          const response = await interceptor.get('shop/products/');
          return response.data;
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.invalidateQueries(['shopProduct'])
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['shopProduct'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default GetShopProduct
