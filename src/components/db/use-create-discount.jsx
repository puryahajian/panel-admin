import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function useCreateDiscount() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({gregorianDateFrom, gregorianDateTo, nameCampain, codeDiscount, typeDiscount, valueDiscount, selectProduct}) => {
            // console.log(gregorianDateFrom, gregorianDateTo, nameCampain, codeDiscount, typeDiscount, valueDiscount, selectProduct)
            const validFromDate = new Date(`${gregorianDateFrom}T00:14:56.480Z`);
            const validFromIsoString = validFromDate.toISOString();

            // تبدیل gregorianDateTo به فرمت ISO
            const validToDate = new Date(`${gregorianDateTo}T00:14:56.480Z`);
            const validToIsoString = validToDate.toISOString();
            // console.log(validFromIsoString)

            const data = JSON.stringify({
                name: nameCampain,
                code: codeDiscount,
                type: typeDiscount,
                value: valueDiscount,
                valid_from: validFromIsoString,
                valid_to: validToIsoString,
                products: selectProduct,
                active: true
            });

            const res = await interceptor.post(`discount/admin/api/v1/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('allAdmin')
        },
    });
}

export default useCreateDiscount
