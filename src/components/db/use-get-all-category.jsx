import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';

function UseGetAllCategory() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['allCategory'],
        queryFn: async () => {
          const response = await interceptor.get('product/api/v1/category/');
          return response.data;
        },
        onSuccess: (data) => {
            
        },
    });
    
    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetAllCategory
