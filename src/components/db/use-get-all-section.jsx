import { useQuery } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useGetAllSection() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['allSection'],
        queryFn: async () => {
          const response = await interceptor.get('ticket/api/v1/admin/sections/');
          return response.data;
        },
    });

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default useGetAllSection
