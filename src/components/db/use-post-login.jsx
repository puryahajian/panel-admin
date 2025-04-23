import React from 'react'
import qs from "qs";
import Cookies from "js-cookie";
import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function UsePostLogin() {
    const queryClient = useQueryClient();
    
    const mutation = useMutation(
        async ({ number ,pass}) => {

            const data = qs.stringify({
                phone: number,
                password: pass
            });

            const response = await interceptor.post(`doctor/login/`, data);
            const { access: accessToken, refresh: refreshToken  } = response.data;

            Cookies.set("access", accessToken, { expires: 99, path: '/' });
            Cookies.set("refresh", refreshToken, { expires: 99 });

            return response.data;
        },
        {
            onSuccess: (data) => {
                // console.log(data)
                queryClient.invalidateQueries(['login']);
            },
            onError: (error) => {
                console.log("خطا در ارسال تیکت:", error.message);
            },
            
        }
    );

    return mutation;
}

export default UsePostLogin
