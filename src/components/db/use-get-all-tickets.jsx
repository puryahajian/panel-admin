import { useQuery } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useGetAllTickets() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['allTickets'],
    queryFn: async () => {
      const response = await interceptor.get('tickets/api/v1/tickets/');
      return response.data;
    },
  });
  
  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetAllTickets
