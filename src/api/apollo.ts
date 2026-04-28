import {
  ApolloClient,
  InMemoryCache,
  createHttpLink,
  from,
  Observable,
} from '@apollo/client';
import { onError } from '@apollo/client/link/error';
import { store } from '@/redux/store';
import { logout } from '@/redux/auth/auth.slice';
import { API_BASE_URL } from '@/config/env.config';
import axios from 'axios';

const httpLink = createHttpLink({
  uri: `${API_BASE_URL}/graphql`,
  credentials: 'include',
});

let isRefreshing = false;
let pendingRequests: (() => void)[] = [];

const resolvePendingRequests = () => {
  pendingRequests.forEach((callback) => callback());
  pendingRequests = [];
};

const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    const isUnauthorized =
      (graphQLErrors &&
        graphQLErrors.some(
          ({ message, extensions }) =>
            message === 'Unauthorized' ||
            extensions?.code === 'UNAUTHENTICATED' ||
            (extensions?.response as { statusCode?: number } | undefined)
              ?.statusCode === 401,
        )) ||
      (networkError &&
        'statusCode' in networkError &&
        networkError.statusCode === 401);

    if (isUnauthorized) {
      const user = store.getState().auth.user;

      if (!user) {
        store.dispatch(logout('expired'));
        return;
      }

      if (!isRefreshing) {
        isRefreshing = true;
        axios
          .post(
            `${API_BASE_URL}/auth/refresh`,
            { userId: user.id },
            { withCredentials: true },
          )
          .then(() => {
            isRefreshing = false;
            resolvePendingRequests();
          })
          .catch(() => {
            isRefreshing = false;
            pendingRequests = [];
            store.dispatch(logout('expired'));
          });
      }

      return new Observable((observer) => {
        pendingRequests.push(() => {
          forward(operation).subscribe(observer);
        });
      });
    }
  },
);

export const client = new ApolloClient({
  link: from([errorLink, httpLink]),
  cache: new InMemoryCache(),
});
