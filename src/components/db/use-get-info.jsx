import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';


function useGetInfo() {

  const { data, error, isLoading } = useQuery({
    queryKey: ['getInfo'],
    queryFn: async () => {
      const response = await interceptor.get('option/admin/');
      return response.data;
    },
  });

  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetInfo
