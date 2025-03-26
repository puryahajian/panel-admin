import { useMutation, useQueryClient } from '@tanstack/react-query';
import React, { useEffect } from 'react'
import qs from "qs";
import interceptor from '../../lib/interceptor';

function UseCreateProduct() {
    const queryClient = useQueryClient();
    
    const mutation = useMutation(
        async ({ detailProduct, selectedFile, description}) => {
            const formData = new FormData();
            formData.append('description', description);
            formData.append('name', detailProduct);
            formData.append('image', selectedFile);

            const response = await interceptor.post(`shop/products/request/`, formData);
            return response.data;
        },
        {
            onSuccess: (data) => {
                queryClient.invalidateQueries(['createProduct']);
            },
        }
    );
    
    return mutation;
}

export default UseCreateProduct
