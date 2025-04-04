import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetAllTicket() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['listTicket'],
        queryFn: async () => {
          const response = await interceptor.get('ticket/tickets/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['listTicket'])
        },

    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['listTicket'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetAllTicket
