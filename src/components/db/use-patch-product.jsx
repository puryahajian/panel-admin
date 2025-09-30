import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';
import { toast } from 'react-toastify';


function usePatchProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idEdit, 
            selectorCategory, 
            selectorState, 
            nameEditProduct, 
            priceEditProduct, 
            selectedFile, 
            inState, 
            newImage1 ,
            newImage2 ,
            newImage3 ,
            newImage4 ,
            newImage5 ,
            wholPrice,
            isCheckedAmazon,
            isCheckedSoqMaftoh,
            productTol,
            productArz,
            productErtefa,
            isCheckedNon,
            stockNumber,
            unitWeigth,
            offerEdit
        }) => {
            
            const formData = new FormData();

            if (nameEditProduct) formData.append('name', nameEditProduct);

            const rawPrice = priceEditProduct?.toString().replace(/,/g, '');
            const price = parseInt(rawPrice, 10);

            if (!isNaN(price)) {
                formData.append('price', price);
            } else if (priceEditProduct) {
                formData.append('price', priceEditProduct);
            }

            if (selectorCategory) formData.append('category_id', selectorCategory);

            if (selectorState !== '') {
                formData.append('exist', selectorState);
            } else if (inState !== '') {
                formData.append('exist', inState);
            }           

            if (selectedFile) formData.append('image', selectedFile);

            if (newImage1) formData.append('image1', newImage1);
            if (newImage1) formData.append('image1', newImage1);
            if (newImage2) formData.append('image2', newImage2);
            if (newImage3) formData.append('image3', newImage3);
            if (newImage4) formData.append('image4', newImage4);
            if (newImage5) formData.append('image5', newImage5);
            if (productTol && productArz && productErtefa) {
                const size = `${productTol}x${productArz}x${productErtefa}`; // ترکیب مقادیر به‌صورت رشته
                formData.append('size', size);
            }   
            
            if (productTol) formData.append('tole', productTol);
            if (productArz) formData.append('arze', productArz);
            if (productErtefa) formData.append('ertefahe', productErtefa);

            if (wholPrice) formData.append('wholesale_price', wholPrice);
            if (isCheckedSoqMaftoh) formData.append('soghol_maftoh', isCheckedSoqMaftoh);
            if (isCheckedAmazon) formData.append('amazon', isCheckedAmazon);
            if (isCheckedNon) formData.append('non', isCheckedNon);
            if (stockNumber) formData.append('stock', stockNumber);
            if (unitWeigth) formData.append('unit_weight', unitWeigth);
            if (offerEdit) formData.append('discount_percentage', offerEdit);

            const res = await interceptor.patch(`product/admin/api/v1/products/${idEdit}/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success('محصول ویرایش شد') 
            queryClient.removeQueries('allProduct');
        },
        
    });
}

export default usePatchProduct
