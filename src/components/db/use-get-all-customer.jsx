import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetAllCustomer() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['allCustomer'],
        queryFn: async () => {
          const response = await interceptor.get('cashier/api/v1/customers/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allCustomer')
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries('allCustomer')
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetAllCustomer
