import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useGetAllOrder() {
  const { data, error, isLoading } = useQuery({
      queryKey: ['listOrders'],
      queryFn: async () => {
        const response = await interceptor.get('order/api/v1/');
        return response.data;
      },
  });

  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetAllOrder
