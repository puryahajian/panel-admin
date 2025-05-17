import { useQuery, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseGetAllSection() {
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['allSection'],
        queryFn: async () => {
          const response = await interceptor.get('ticket/api/v1/ticket-sections/');
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries('allSection')
        },
    });

    // useEffect(() => {
    //     if (data) {
    //         queryClient.invalidateQueries('allProduct')
    //     }
    // }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetAllSection
