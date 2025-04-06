import { useQuery, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import interceptor from '../../lib/interceptor';
import { useParams } from 'react-router-dom';

function UseGetVisit() {
    const {id} = useParams();
    console.log(id)
    const queryClient = useQueryClient();

    const { data, error, isLoading } = useQuery({
        queryKey: ['listVisit', id],
        queryFn: async () => {
          const response = await interceptor.get(`doctor-request/doctor-visit/${id}/chats/`);
          return response.data;
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries(['listVisit'])
        },

    });

    useEffect(() => {
        if (data) {
            queryClient.invalidateQueries(['listVisit'])
        }
    }, [data]);

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default UseGetVisit
