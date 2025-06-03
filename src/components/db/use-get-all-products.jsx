import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useGetAllProducts() {

    return useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
            const response = await interceptor.get('product/api/v1/product/');
            return response.data;
        },
    });
}

export default useGetAllProducts
