import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function useGetAllAdmin() {

  const { data, error, isLoading } = useQuery({
    queryKey: ['allAdmin'],
    queryFn: async () => {
      const response = await interceptor.get('cashier/api/v1/cashiers/');
      return response.data;
    },
  });

  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetAllAdmin
