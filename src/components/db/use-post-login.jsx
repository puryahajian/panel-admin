import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import Cookies from "js-cookie";
import { useNavigate } from 'react-router-dom';


function usePostLogin() {

    return useMutation({
        mutationFn: async ({ userName }) => {
            const data = JSON.stringify({
                phone: userName,
            });

            const res = await interceptor.post(`account/mobile/api/v1/login/`, data);
            return res.data;
        },
        onSuccess: (data) => {
         
        },
        onError: (err) => {
            console.log(err)
        }
    });

}

export default usePostLogin