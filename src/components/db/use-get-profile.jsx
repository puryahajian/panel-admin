import React, { useEffect } from 'react'
import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';


function useGetProfile() {

    const { data, error, isLoading } = useQuery({
        queryKey: [''],
        queryFn: async () => {
        const response = await interceptor.get('account/mobile/api/v1/profile/');
        return response.data;
        },
    });

    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default useGetProfile;
