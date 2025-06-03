import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function usePatchProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ selectedLogo, nameShop, numberShop, numberSupportShop, openTime, closeTime, selectedBannerOne, selectedBannerTwo,lat,lng, telegram, whatsApp, instagram, aboutUse }) => {
        
            const data = new FormData();
            if (nameShop) data.append('name', nameShop);
            data.append('phone', numberShop);
            data.append('open_time', openTime);
            data.append('close_time', closeTime);
            data.append('logo', selectedLogo);
            data.append('support_phone', numberSupportShop);
            data.append('banner_one', selectedBannerOne);
            data.append('banner_two', selectedBannerTwo);
            data.append('lat', lat);
            data.append('lng', lng);
            data.append('telegram', telegram);
            data.append('instagram', instagram);
            data.append('whatsApp', whatsApp);
            data.append('about_us', aboutUse);

            const res = await interceptor.patch(`option/api/v1/cashier/store-info/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries(['getInfo']);
        },
    });
}

export default usePatchProfile
