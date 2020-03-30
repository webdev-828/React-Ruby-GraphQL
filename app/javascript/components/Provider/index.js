/**
 * Use a provider pattern to pass
 * the client instances to React components:
 * https://reactjs.org/docs/context.html#contextprovider
 */

import React from 'react';

import { ApolloProvider } from 'react-apollo';

// Apollo Client configuration + Instance  with middleware
import { createCache, createClient } from '../../utils/apollo';

export default ({ children }) => <ApolloProvider client={createClient(createCache())}>{children}</ApolloProvider>;
