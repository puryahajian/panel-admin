import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import convertPriceToNumber from '../../lib/convert-to-number';


function useCreateProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ selectedFile, 
            nameProduct, 
            priceProduct, 
            selectorCategory, 
            unitName,
            count,
            offer, 
            description, 
            newImage1,
            newImage2,
            newImage3,
            wholPrice,
            productTol,
            productArz,
            productErtefa,
            bgProduct,
            isCheckedNon,
            isCheckedAmazon,
            isCheckedSoqMaftoh,
        }) => {

            const formData = new FormData();
            if (nameProduct) formData.append('name', nameProduct);
            if (priceProduct) formData.append('price', convertPriceToNumber(priceProduct));
            // if (unitName) formData.append('unit_name', unitName);
            if (selectorCategory) formData.append('category', selectorCategory);
            if (selectedFile) {
                formData.append('image', selectedFile);
            } else if (bgProduct) {
                formData.append('image', bgProduct);
            }
            if (newImage1) formData.append('image1', newImage1);
            if (newImage2) formData.append('image2', newImage2);
            if (newImage3) formData.append('image3', newImage3);
            // if (newImage4) formData.append('image4', newImage4);
            // if (newImage5) formData.append('image5', newImage5);
            if (wholPrice) formData.append('wholesale_price', wholPrice?.replace(/,/g, ""));
            if (isCheckedNon) formData.append('non', isCheckedNon);
            if (isCheckedAmazon) formData.append('amazon', isCheckedAmazon);
            if (isCheckedSoqMaftoh) formData.append('soghol_maftoh', isCheckedSoqMaftoh);

            if (count) formData.append('stock', count);
            
            if (productTol) formData.append('tole', productTol);
            if (productArz) formData.append('arze', productArz);
            if (productErtefa) formData.append('ertefahe', productErtefa);

            if (description) formData.append('details', description);
            if (offer) formData.append('discount_percentage', offer);

            const res = await interceptor.post(`product/admin/api/v1/products/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            console.log(data)
            queryClient.removeQueries('allProduct')
        },
        onError: (err) => {
            console.log(err)
        }
    });
}

export default useCreateProduct
