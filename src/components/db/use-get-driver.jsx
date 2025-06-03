import { useQuery } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function useGetDriver() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['allRider'],
    queryFn: async () => {
      const response = await interceptor.get('courier/api/v1/cashier/riders/');
      return response.data;
    },
  });

  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetDriver
