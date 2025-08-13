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
            selectedImage1,
            selectedImage2,
            selectedImage3,
            wholPrice,
            productTol,
            productArz,
            productErtefa,
            bgProduct,
            isCheckedNon,
            isCheckedAmazon,
            isCheckedSoqMaftoh,
            category,
            unit_name
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
            if (selectedImage1) formData.append('image1', selectedImage1);

            if (selectedImage2) formData.append('image2', selectedImage2);
            if (selectedImage3) formData.append('image3', selectedImage3);
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
