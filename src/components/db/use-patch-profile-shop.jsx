import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import qs from 'qs';
import interceptor from '../../lib/interceptor';
import { toast } from 'react-toastify';

function UsePatchProfileShop() {
    const queryClient = useQueryClient();
    const storedCoordinates = JSON.parse(localStorage.getItem('addressCoordinates'));
    // console.log('مختصات بازیابی‌شده از localStorage:', storedCoordinates);
    
    const mutation = useMutation(
        async ({ 
            selectedBg, 
            selectedBannerOne,
            selectedBannerTwo,
            selectedBannerThree, 
            selectedLogo, 
            nameProduct, 
            numberPhoneShop, 
            nationalCode, 
            support, 
            timeOpen, 
            timeClose,
            catalog,
            about, 
            instagram,
            telegram,
            whatsApp, 
            certificate, 
            tradeId
        }) => {
            const formData = new FormData();
            formData.append('name', nameProduct);
            formData.append('trade_id', tradeId);
            formData.append('national_code', nationalCode);
            formData.append('description', about);
            formData.append('catalog', catalog);
            formData.append('location_lat', storedCoordinates[0] || '');
            formData.append('location_lng', storedCoordinates[1] || '');
            if (selectedBg) formData.append('image', selectedBg);
            if (selectedBannerOne) formData.append('banner_1', selectedBannerOne);
            if (selectedBannerTwo) formData.append('banner_2', selectedBannerTwo);
            if (selectedBannerThree) formData.append('banner_3', selectedBannerThree);
            if (selectedLogo) formData.append('cert_1', selectedLogo);
            if (certificate) formData.append('cert_2', certificate);
            formData.append('shop_phones', numberPhoneShop);
            formData.append('start_time', timeOpen);
            formData.append('end_time', timeClose);
            formData.append('instagram', instagram);
            formData.append('whats_app', whatsApp);
            formData.append('telegram', telegram);
            
            const response = await interceptor.patch('shop/profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log(data)
                toast.success('پروفایل با موفقیت ذخیره شد')
                queryClient.invalidateQueries(['createNewProduct']);
            },
        }
    );
    
    return mutation;
}

export default UsePatchProfileShop
