import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';
import { toast } from 'react-toastify';


function usePatchProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idEdit, omNameProduct,selectedSubCategoryId, selectorState, nameEditProduct, priceEditProduct, selectedFile, inState, sku }) => {
            
            const formData = new FormData();

            if (nameEditProduct) formData.append('name', nameEditProduct);

            // const rawPrice = priceEditProduct?.toString().replace(/,/g, '');
            // const price = parseInt(rawPrice, 10);

            if (priceEditProduct) formData.append('price', priceEditProduct);

            if (selectedSubCategoryId) formData.append('category', selectedSubCategoryId);

            if (selectorState !== '') {
                formData.append('exist', selectorState);
            } else if (inState !== '') {
                formData.append('exist', inState);
            }           
            if (sku) formData.append('sku', sku);
            if (selectedFile) formData.append('image', selectedFile);
            if (omNameProduct) formData.append('om_name', omNameProduct);
    
            const res = await interceptor.patch(`product/admin/api/v1/products/${idEdit}/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success('محصول ویرایش شد') 
            queryClient.removeQueries('allProduct');
        },
        onError: (err) => {
            console.log(err)
        }
        
    });
}

export default usePatchProduct
