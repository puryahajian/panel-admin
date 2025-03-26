import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import qs from "qs";
import interceptor from '../../lib/interceptor';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


function UsePostLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const mutation = useMutation(
        async ({ userName, password }) => {

            const data = qs.stringify({
                phone: userName,
                password: password
            });

            const response = await interceptor.post(`shop/login/`, data);
            const { access: accessToken, refresh: refreshToken  } = response.data;

            Cookies.set("access", accessToken, { expires: 99, path: '/' });
            Cookies.set("refresh", refreshToken, { expires: 99 });

            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log(data)
                navigate('/')
                queryClient.invalidateQueries(['Login'], data);
                // toast.success('درخواست موفق')
            },
            onError: (error) => {
                console.log("خطا در ارسال تیکت:", error.message);
            },
        }
    );

    return mutation;
}

export default UsePostLogin
