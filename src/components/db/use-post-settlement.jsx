import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function UseShopSettlement() {
    const queryClient = useQueryClient();
    
    const mutation = useMutation(
        async ({ mony }) => {

            const data = qs.stringify({
                amount: mony,
            });

            const response = await interceptor.post(`doctor/settlements/`, data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['doctorSettlements']);
            },
            onError: (error) => {
                console.log("خطا در ارسال تیکت:", error.message);
            },
            
        }
    );
    // useEffect(() => {
    //     queryClient.invalidateQueries(['comment']);
    // }, [mutation])
    

    return mutation;
}

export default UseShopSettlement

