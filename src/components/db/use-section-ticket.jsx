import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseSectionTicket() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['sectionTicket'],
        queryFn: async () => {
          const response = await interceptor.get('ticket/ticket-sections/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['sectionTicket'])
        },
    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['sectionTicket'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseSectionTicket
