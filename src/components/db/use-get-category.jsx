import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

async function fetchAllCategories(url = 'product/public/api/v1/categories/') {
    let results = [];
    let nextUrl = url;

    while (nextUrl) {
        const response = await interceptor.get(nextUrl);
        const data = response.data;

        results = [...results, ...data.results];
        nextUrl = data.next; // اگر null شد، حلقه متوقف می‌شود
    }

    return results;
}

function useGetCategory() {
    const { data, error, isLoading } = useQuery({
        queryKey: ['allCategory'],
        queryFn: () => fetchAllCategories(),
    });

    return {data};
}

export default useGetCategory;
