import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

function useSalesReport() {

    const { data, error, isLoading } = useQuery({
        queryKey: ['sale'],
        queryFn: async () => {
          const response = await interceptor.get('order/api/v1/sales-report/');
          return response.data;
        },
    });


    if (isLoading) return <div>loading</div>;

    if (error){ return <div>Error: {error?.message}</div>};
    
    return {data}
}

export default useSalesReport
