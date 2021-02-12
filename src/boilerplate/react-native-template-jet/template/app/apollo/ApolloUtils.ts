import { ApolloClient, InMemoryCache, ApolloLink, HttpLink } from '@apollo/client';
import { onError } from '@apollo/client/link/error';

import { API_BASE_URL } from '@/constants';

function reportGraphQLError(err: Error, operation: any) {
  // TODO: add error reporting
  // bugsnag.notify(
  //   new Error(`[GraphQL error]: Message: ${err.message}`),
  //   (event: any) => {
  //     // See: https://docs.bugsnag.com/platforms/javascript/reporting-handled-errors/#customizing-diagnostic-data
  //     event.severity = "error";
  //     event.context = "ApolloWrapper errorLink";
  //     event.addMetadata("graphql", "operationName", operation?.operationName);
  //     event.addMetadata("graphql", "query", operation?.query?.loc?.source?.body);
  //     event.addMetadata("graphql", "variables", JSON.stringify(operation.variables || {}));
  //   }
  // )
}

function reportNetworkError(err: Error) {
  // TODO: add error reporting
  // bugsnag.notify(new Error(`[Network Error]: ${err.message}`), (event: any) => {
  //   event.severity = 'info';
  //   event.context = 'ApolloWrapper errorLink networkError';
  //   // @ts-ignore
  //   event.addMetadata('network', 'statusCode', networkError.statusCode);
  // });
}

function report401Error(err: Error) {
  // TODO: add error reporting
  // bugsnag.notify(new Error(`Network Error: ${err.message}: Logging Out`), (event: any) => {
  //   event.severity = 'info';
  //   event.context = 'ApolloWrapper errorLink networkError';
  //   // @ts-ignore
  //   event.addMetadata('network', 'statusCode', networkError.statusCode);
  //   event.addMetadata('network', 'logOutReason', 'User tried to make an unauthorized request');
  // });
}

export function useApolloClient() {
  // @ts-ignore
  const errorLink = onError(({ graphQLErrors, networkError, operation }) => {
    if (graphQLErrors) {
      graphQLErrors.map((err: Error) => {
        reportGraphQLError(err, operation);
      });
    }

    // @ts-ignore
    if (networkError && networkError.statusCode !== 401) {
      reportNetworkError(networkError);
    }

    // @ts-ignore
    if (networkError && networkError.statusCode === 401) {
      // TODO: log user out if they encouter a 401
      report401Error(networkError);
    }
  });

  const httpLink = new HttpLink({
    uri: `${API_BASE_URL}/graphql`,
    headers: {
      // TODO: add authorization
      // authorization: `Bearer ${idToken}`,
    },
  });

  const link = ApolloLink.from([errorLink, httpLink]);

  const client = new ApolloClient({
    link,
    cache: new InMemoryCache(),
  });

  return client;
}
