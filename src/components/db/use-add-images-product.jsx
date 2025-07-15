import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseAddImagesProduct() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: async ({ idEdit, selectedOtherFile }) => {

            const formData = new FormData();
            // if (nameProduct) formData.append('name', nameProduct);
            // if (priceProduct) formData.append('price', convertPriceToNumber(priceProduct));
            // if (unitName) formData.append('unit_name', unitName);
            // if (selectorCategory) formData.append('category_id', selectorCategory);
            if (idEdit) formData.append('product', idEdit);
            if (selectedOtherFile) formData.append('image', selectedOtherFile);
            // if (description) formData.append('details', description);
            // if (offer) formData.append('discount_percentage', offer);

            const res = await interceptor.put(`product/admin/api/v1/product-images/${idEdit}/`, formData);
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

export default UseAddImagesProduct
