import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useGetAllOrder() {
  const { data, error, isLoading } = useQuery({
      queryKey: ['listOrders'],
      queryFn: async () => {
        const response = await interceptor.get('order/admin/v1/orders/');
        return response.data;
      },
  });

  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetAllOrder
