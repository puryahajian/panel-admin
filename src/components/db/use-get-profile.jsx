import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetProfile() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getProfile'],
        queryFn: async () => {
          const response = await interceptor.get('shop/profile/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['getProfile'])
        },
        
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['getProfile'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetProfile
