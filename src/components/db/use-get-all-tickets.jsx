import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseGetAllTickets() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['allTickets'],
        queryFn: async () => {
          const response = await interceptor.get('ticket/api/v1/tickets/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allTickets')
        },
    });

    // useEffect(() => {
    //     if (data) {
    //         queryClient.invalidateQueries('allProduct')
    //     }
    // }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetAllTickets
