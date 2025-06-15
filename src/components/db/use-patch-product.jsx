import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';
import { toast } from 'react-toastify';


function usePatchProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idEdit, selectorCategory, selectorState, nameEditProduct, priceEditProduct, selectedFile, inState }) => {
            
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
    
            const res = await interceptor.patch(`product/api/v1/product/${idEdit}/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success('محصول ویرایش شد') 
            queryClient.removeQueries('allProduct');
        },
        
    });
}

export default usePatchProduct
