import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react'
import interceptor from '../../lib/interceptor';
import qs from "qs";

function UseCreateNewProduct() {
    const queryClient = useQueryClient();
    
    const mutation = useMutation(async ({ 
            selectProduct, 
            priceProduct, 
            typeOfPackProduct, 
            stateProduct,
            capacityProduct,
            detailsProduct
        }) => {

            const data = qs.stringify({
                price: priceProduct,
                product: selectProduct,
                capacity: capacityProduct,
                inventory_state: stateProduct,
                material: typeOfPackProduct,
                how_to_use: detailsProduct
            });
            
            const response = await interceptor.post(`shop/products/create/`, data);
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['createNewProduct']);
            },
        }
    );
    
    return mutation;
}

export default UseCreateNewProduct
