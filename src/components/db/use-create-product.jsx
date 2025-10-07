import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import convertPriceToNumber from '../../lib/convert-to-number';


function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ 
            bgProduct, 
            nameProduct,
            weightt,
            heightt, 
            priceProduct, 
            lengthh, 
            widthh, 
            unitName,
            offer, 
            description, 
            gregorianBirthDay, 
            omNameProduct, 
            sku ,
            getIdSubCategory, 
            bgMoreImg1,
            bgMoreImg2,
            bgMoreImg3,
        }) => {

            const images = [bgMoreImg1, bgMoreImg2, bgMoreImg3];

            const formData = new FormData();
            if (nameProduct) formData.append('name', nameProduct);
            if (priceProduct) formData.append('price', priceProduct);
            if (unitName) formData.append('unit_name', unitName);
            if (getIdSubCategory) formData.append('category', getIdSubCategory);
            if (bgProduct) formData.append('image', bgProduct);
            if (description) formData.append('details', description);
            if (omNameProduct) formData.append('om_name', omNameProduct);
            if (offer) formData.append('discount_percentage', offer);
            if (gregorianBirthDay) formData.append('expiration_date', gregorianBirthDay);
            if (sku) formData.append('sku', sku);
            if (lengthh) formData.append('length', lengthh);
            if (widthh) formData.append('width', widthh);
            if (heightt) formData.append('height', heightt);
            if (weightt) formData.append('weight', weightt);
            images.forEach(img => {
                if (img) {
                    formData.append('images', img);
                }
            });
            // if (getIdSubCategory) formData.append('sku', getIdSubCategory);

            const res = await interceptor.post(`product/admin/api/v1/products/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            // console.log(data)
            queryClient.removeQueries('allProduct')
        },
        onError: (err) => {
            console.log(err)
        }
    });
}

export default useCreateProduct
