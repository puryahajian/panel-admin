import React from 'react'
import interceptor from '../../lib/interceptor';
import { useQuery } from '@tanstack/react-query';

function useGetDiscount() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['allDescription'],
        queryFn: async () => {
            const response = await interceptor.get('discount/admin/api/v1/');
            return response.data;
        },
    });

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default useGetDiscount
