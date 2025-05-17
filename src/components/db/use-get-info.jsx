import React, { useEffect } from 'react'
import { useQuery, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';


function UseGetInfo() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getInfo'],
        queryFn: async () => {
          const response = await interceptor.get('option/api/v1/cashier/store-info/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('getInfo')
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries('getInfo')
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetInfo
