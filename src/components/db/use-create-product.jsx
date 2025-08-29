import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import convertPriceToNumber from '../../lib/convert-to-number';


function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ bgProduct, nameProduct, priceProduct, selectorCategory, unitName,offer, description, gregorianBirthDay, omNameProduct }) => {

            const formData = new FormData();
            if (nameProduct) formData.append('name', nameProduct);
            if (priceProduct) formData.append('price', convertPriceToNumber(priceProduct));
            if (unitName) formData.append('unit_name', unitName);
            if (selectorCategory) formData.append('category', selectorCategory);
            if (bgProduct) formData.append('image', bgProduct);
            if (description) formData.append('details', description);
            if (omNameProduct) formData.append('om_name', omNameProduct);
            if (offer) formData.append('discount_percentage', offer);
            if (gregorianBirthDay) formData.append('expiration_date', gregorianBirthDay);

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
