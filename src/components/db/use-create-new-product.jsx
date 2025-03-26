import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';

function UseCreateNewProduct() {
    const queryClient = useQueryClient();
    
    const mutation = useMutation(
        async ({ selectProduct, priceProduct, stateProduct, capacityProduct, detailProduct,typeOfPackProduct }) => {

            const formData = new FormData();
            formData.append('price', priceProduct);
            formData.append('product', selectProduct);
            formData.append('capacity', capacityProduct);
            formData.append('inventory_state', stateProduct);
            formData.append('material', typeOfPackProduct);
            formData.append('how_to_use', detailProduct);

            // console.log(formData)
            
            const response = await interceptor.post(`shop/products/create/`, formData);
            return response.data;
        },
        {
            onSuccess: (data) => {
                console.log(data)
                queryClient.invalidateQueries(['createNewProduct']);
            },
        }
    );
    
    return mutation;
}

export default UseCreateNewProduct
