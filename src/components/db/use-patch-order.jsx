import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function usePatchOrder() {
     const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ timeDelivery, giveIdDriver, id, state }) => {
            const convertTimeToInteger = (timeString) => {
                if (!timeString) return null;
                return parseInt(timeString.replace('', ''), 10);
            };

            const timeNumber = convertTimeToInteger(timeDelivery);

            if (timeNumber) {}

            const formData = new FormData();
                if (giveIdDriver) formData.append('rider', giveIdDriver);
                if (timeNumber) formData.append('d_time', timeNumber);
                if (state) formData.append('state', state);

                // rider: giveIdDriver,
                // d_time: timeNumber,
                // state: state
            

            const res = await interceptor.patch(`order/api/v1/orders/${id}/update-status/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.removeQueries('listOrders');
        },
        onError: (err) => {
            console.log(err)
        }
    });
}

export default usePatchOrder
