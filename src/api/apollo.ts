import { ApolloClient, InMemoryCache, createHttpLink, from } from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { store } from '@/redux/store';
import { logout } from '@/redux/auth/auth.slice';
import { API_BASE_URL } from '@/config/env.config';

const httpLink = createHttpLink({
  uri: `${API_BASE_URL}/graphql`,
  credentials: 'include',
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors) {
    graphQLErrors.forEach(({ message, extensions }) => {
      if (
        message === 'Unauthorized' ||
        extensions?.code === 'UNAUTHENTICATED' ||
        (extensions?.response as { statusCode?: number } | undefined)?.statusCode === 401
      ) {
        store.dispatch(logout('expired'));
      }
    });
  }

  if (networkError && 'statusCode' in networkError && networkError.statusCode === 401) {
    store.dispatch(logout('expired'));
  }
});

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
