import { useState } from 'react';
import { useQuery } from '@apollo/client';
import { GET_INSIGHTS } from './insights.graphql';
import { useAppSelector } from '@/redux/hooks';

export const useInsights = () => {
    const { user } = useAppSelector((state) => state.auth);
    const [filter, setFilter] = useState('Weekly');

    const { data, loading, error, refetch } = useQuery(GET_INSIGHTS, {
        variables: {
            userId: user?.id || '',
            filter,
        },
        skip: !user?.id,
        fetchPolicy: 'cache-and-network',
    });

    return {
        insights: data?.insights,
        loading,
        error,
        filter,
        setFilter,
        refetch,
    };
};
