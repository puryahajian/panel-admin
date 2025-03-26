import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetMaterial() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getMaterial'],
        queryFn: async () => {
          const response = await interceptor.get('shop/materials');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getMaterial'])
        },
        
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['getMaterial'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetMaterial
