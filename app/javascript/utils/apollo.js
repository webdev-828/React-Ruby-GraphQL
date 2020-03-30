/**
 * @Details_of_packages_below
 * We use graphql-tag to build our first queries.
  apollo-client is a generic framework-agnostic package for performing and caching GraphQL requests.
  apollo-cache-inmemory is a storage implementation for Apollo cache.
  react-apollo contains a set of React components for displaying data.
  apollo-link and other links implement a middleware pattern for apollo-client operations ( can find further details
     https://www.apollographql.com/docs/link/overview.html ).
  Now we need to create an entry point for our front-end application. Remove hello_react.jsx from the packs folder and add index.js:

 */

// In this file we want to configure the two core entities of the Apollo application, the client and the cache (or more precisely, the functions to create both):

// Client
import { ApolloClient } from 'apollo-client';

// Cache
import { InMemoryCache } from 'apollo-cache-inmemory';

// Links
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { ApolloLink, Observable } from 'apollo-link';

// CREATE CACHE
export const createCache = () => {
  const cache = new InMemoryCache();

  if (process.env.NODE_ENV === 'development') {
    window.apolloCacheDevelopmentOnly = cache;
  }

  return cache;
};

// Get Token from Meta Tags on Application.html.erb

const getToken = () => document.querySelector('meta[name="csrf-token"]').getAttribute('content');

const token = getToken();

// MiddleWare Operationt that sets the CSRF token on requests to protect from forgery
const setTokenForOperation = async operation =>
  operation.setContext({
    headers: {
      'X-CSRF-Token': token,
    },
  });

// Link With CSRF Token
const createLinkWithToken = () =>
  new ApolloLink(
    (operation, forward) =>
      new Observable(observer => {
        let handle;
        Promise.resolve(operation)
          .then(setTokenForOperation)
          .then(() => {
            handle = forward(operation).subscribe({
              next: observer.next.bind(observer),
              error: observer.error.bind(observer),
              complete: observer.complete.bind(observer),
            });
          })
          .catch(observer.error.bind(observer));

        return () => {
          if (handle) handle.unsubscribe();
        };
      })
  );

// LOG ERRORS
const logError = error => console.error(error);

// Create Error Link
const createErrorLink = () =>
  onError(({ graphQLErrors, networkError, operation: { operationName, variables } }) => {
    if (graphQLErrors) {
      logError('GraphQL - Error', {
        errors: graphQLErrors,
        operationName,
        variables,
      });
    }

    if (networkError) {
      logError('GraphQL - networkError', networkError);
    }
  });

// Tell Apollo client about the endpoint for making queries: (HTTP LINK) - this was default endpoint added by graphql install

const createHttpLink = () =>
  new HttpLink({
    uri: '/graphql',
    credentials: 'include',
  });

// Initialize the Apollo Client function that packages the instance together

// passed in are the links which basically run as  a middleware through all the apollo client requests

export const createClient = (cache, requestLink) =>
  new ApolloClient({
    link: ApolloLink.from([createErrorLink(), createLinkWithToken(), createHttpLink()]),
    cache,
  });
