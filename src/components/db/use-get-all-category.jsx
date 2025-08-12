import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useGetAllCategory() {
  const { data, error, isLoading } = useQuery({
    queryKey: ['allCategory'],
    queryFn: async () => {
      const response = await interceptor.get('product/admin/api/v1/categories/');
      return response.data;
    },
  });
  
  if (isLoading) return <div>loading</div>;

  if (error){ return <div>Error: {error?.message}</div>};
  
  return {data}
}

export default useGetAllCategory
