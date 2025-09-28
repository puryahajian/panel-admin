import { useQuery } from '@tanstack/react-query';
import interceptor from '../../lib/interceptor';

const useGetParentCategory = (selectedParentId) => {
    // console.log(selectedParentId)
    const { data, error, isLoading } = useQuery({
        queryKey: ['parentCategories', selectedParentId],
        queryFn: () => 
            selectedParentId
                ? interceptor.get(`/product/public/api/v1/categories/?parent_id=${selectedParentId}`).then(res => res.data)
                : null,
        enabled: !!selectedParentId,
        keepPreviousData: false, // Don't keep previous data
        cacheTime: 0, // Don't cache the results
        refetchOnWindowFocus: false    
    });

    return {
        data,
        isLoading,
        error
    };
};

export default useGetParentCategory;
