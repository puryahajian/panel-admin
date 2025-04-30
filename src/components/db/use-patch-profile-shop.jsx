import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import qs from 'qs';
import interceptor from '../../lib/interceptor';
import { toast } from 'react-toastify';


function UsePatchProfileShop() {
    // const queryClient = useQueryClient();
    
    // console.log('مختصات بازیابی‌شده از localStorage:', storedCoordinates);
    
    const mutation = useMutation( async (
        { 
            nameProduct, 
            tradeId,
            nationalCode, 
            about, 
            catalog,
            lng, 
            lat,
            selectedBg, 
            selectedBannerOne,
            selectedBannerTwo,
            selectedBannerThree, 
            selectedLogo, 
            numberPhoneShop, 
            timeOpen, 
            timeClose,
            instagram,
            telegram,
            whatsApp, 
            certificate, 
        }) => {
            const formData = new FormData();
            formData.append('name', nameProduct || '');
            formData.append('trade_id', tradeId || '');
            formData.append('national_code', nationalCode || '');
            formData.append('description', about || '');
            formData.append('catalog', catalog || '');
            formData.append('location_lat', lat || '');
            formData.append('location_lng', lng || '');
            formData.append('image', selectedBg || '');
            formData.append('banner_1', selectedBannerOne || '');
            formData.append('banner_2', selectedBannerTwo || '');
            formData.append('banner_3', selectedBannerThree || '');
            formData.append('cert_1', selectedLogo || '');
            formData.append('cert_2', certificate || '');
            formData.append('shop_phones', numberPhoneShop || '');
            formData.append('start_time', timeOpen || '');
            formData.append('end_time', timeClose || '');
            formData.append('instagram', instagram || '');
            formData.append('whats_app', whatsApp || '');
            formData.append('telegram', telegram || '');
            formData.append('shop_home', '12345');
            // formData.forEach((value, key) => {
            //     console.log(key, value);
            // });
            
            const response = await interceptor.patch('shop/profile/', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            return response.data;
        },
        {
            onSuccess: (data) => {
                // console.log(data)
                toast.success('پروفایل با موفقیت ذخیره شد')
                // queryClient.invalidateQueries(['createNewProduct']);
            },
            onError: (error) => {
                // console.log(error)
                // toast.error('خطا در ذخیره پروفایل')
            }
        }
    );
    
    return mutation;
}

export default UsePatchProfileShop
