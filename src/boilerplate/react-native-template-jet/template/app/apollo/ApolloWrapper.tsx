import React from 'react';
import { ApolloProvider } from '@apollo/client';

import { useApolloClient } from './ApolloUtils';

const ApolloWrapper: React.FC = ({ children }) => {
  const client = useApolloClient();

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloWrapper;
