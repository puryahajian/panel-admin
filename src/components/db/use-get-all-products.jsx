import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useGetAllProducts() {

    return useQuery({
        queryKey: ['allProduct'],
        queryFn: async () => {
            const response = await interceptor.get('product/admin/api/v1/products/');
            return response.data;
        },
    });
}

export default useGetAllProducts
