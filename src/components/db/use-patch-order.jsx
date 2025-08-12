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

            const data = JSON.stringify({
                rider: giveIdDriver,
                d_time: timeNumber,
                state: state,
            });
            
            const res = await interceptor.patch(`order/admin/v1/orders/${id}/admin-update-status/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('listOrders');
        },
        onError: (err) => {
        }
    });
}

export default usePatchOrder
