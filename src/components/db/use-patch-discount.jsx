import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function usePatchDiscount() {
     const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({gregorianDateFrom, gregorianDateTo, nameCampain, codeDiscount, typeDiscount, valueDiscount, selectProduct, id, inState}) => {
                    // console.log(inState, id)

            const validFromDate = new Date(`${gregorianDateFrom}T00:14:56.480Z`);
            const validFromIsoString = validFromDate.toISOString();

            // تبدیل gregorianDateTo به فرمت ISO
            const validToDate = new Date(`${gregorianDateTo}T00:14:56.480Z`);
            const validToIsoString = validToDate.toISOString();

            const data = JSON.stringify({
                name: nameCampain,
                code: codeDiscount,
                type: typeDiscount,
                value: valueDiscount,
                valid_from: validFromIsoString,
                valid_to: validToIsoString,
                products: selectProduct,
                active: inState
            })

            const res = await interceptor.patch(`discount/admin/api/v1/${id}/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.removeQueries('allDescription');
        },
        onError: (err) => {
            console.log(err)
        }
    });
}

export default usePatchDiscount
