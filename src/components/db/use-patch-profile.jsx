import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function usePatchProfile() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ 
            selectedLogo, 
            nameShop, 
            numberShop, 
            numberSupportShop, 
            openTime, 
            closeTime, 
            selectedBannerOne, 
            selectedBannerTwo,
            lat,
            lng, 
            telegram, 
            whatsApp, 
            instagram, 
            aboutUse,
            linkBannerOne,
            linkBannerTwo
        }) => {
        
            const data = new FormData();
            if (nameShop) data.append('name', nameShop);
            if (numberShop) data.append('phone', numberShop);
            if (openTime) {
                const formattedOpenTime = `${openTime}:00`;
                data.append('open_time', formattedOpenTime);
            }
            if (closeTime) data.append('close_time', closeTime);
            if (selectedLogo) data.append('logo', selectedLogo);
            if (numberSupportShop) data.append('support_phone', numberSupportShop);
            if (selectedBannerOne) data.append('banner_one', selectedBannerOne);
            if (selectedBannerTwo) data.append('banner_two', selectedBannerTwo);
            if (lat) data.append('lat', lat);
            if (lng) data.append('lng', lng);
            if (telegram) data.append('telegram', telegram);
            if (instagram) data.append('instagram', instagram);
            if (whatsApp) data.append('whatsApp', whatsApp);
            if (aboutUse) data.append('about_us', aboutUse);
            if (linkBannerOne) data.append('banner_one_link', linkBannerOne);
            if (linkBannerTwo) data.append('banner_two_link', linkBannerTwo);


            const res = await interceptor.patch(`option/api/v1/cashier/store-info/`, data);
            return res.data;
        },
        onSuccess: (data) => {
            queryClient.removeQueries('getInfo');
            console.log(data)
        },
    });
}

export default usePatchProfile
