import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';
import { useParams } from 'react-router-dom';

function useGetTicketPage() {
    const { id } = useParams();

    const { data, error, isLoading } = useQuery({
        queryKey: ['getTicketSingel'],
        queryFn: async () => {
          const response = await interceptor.get(`ticket/api/v1/tickets/${id}/`);
          return response.data;
        },
    });

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default useGetTicketPage
