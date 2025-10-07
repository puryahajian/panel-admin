import React from 'react'
import { useMutation, useQueryClient } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';
import { toast } from 'react-toastify';


function usePatchProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idEdit,lengthh,widthh,heightt,weightt, omNameProduct,selectedSubCategoryId, selectorState, nameEditProduct,descriptionEdit, priceEditProduct, selectedFile, inState, sku ,itemImages}) => {
            
            const formData = new FormData();

            if (nameEditProduct) formData.append('name', nameEditProduct);
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
            if (descriptionEdit) formData.append('details', descriptionEdit);
            if (lengthh) formData.append('length', lengthh);
            if (widthh) formData.append('width', widthh);
            if (heightt) formData.append('height', heightt);
            if (weightt) formData.append('weight', weightt);
    
            const res = await interceptor.patch(`product/admin/api/v1/products/${idEdit}/`, formData);
            return res.data;
        },
        onSuccess: (data) => {
            toast.success('محصول ویرایش شد') 
            queryClient.removeQueries('allProduct');
        },
        onError: (err) => {
            // console.log(err)
        }
        
    });
}

export default usePatchProduct
