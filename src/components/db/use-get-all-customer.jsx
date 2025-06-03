import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useGetAllCustomer() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['allCustomer'],
    queryFn: async () => {
      const response = await interceptor.get('cashier/api/v1/customers/');
      return response.data;
    },
  });

  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetAllCustomer
