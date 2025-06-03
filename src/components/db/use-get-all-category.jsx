import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useGetAllCategory() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['allCategory'],
    queryFn: async () => {
      const response = await interceptor.get('product/api/v1/category/');
      return response.data;
    },
  });
  
  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetAllCategory
