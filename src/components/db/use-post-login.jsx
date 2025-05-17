import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import qs from "qs";
import interceptor from '../../lib/interceptor';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


function UsePostLogin() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    return useMutation({
        mutationFn: async ({ userName, password }) => {
            const data = JSON.stringify({
                phone: userName,
                password: password
            });

            const res = await interceptor.post(`account/api/v1/verify/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            const access = data.access;
            const refresh = data.refresh;

            Cookies.set("access", access, { expires: 7 });
            Cookies.set("refresh", refresh, { expires: 7 });
            navigate('/')
            queryClient.invalidateQueries('login');
        },
    });

}

export default UsePostLogin