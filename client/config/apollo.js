import { ApolloClient, HttpLink, InMemoryCache, gql } from "@apollo/client";
import { ApolloProvider } from "@apollo/client/react";

const client = new ApolloClient({
  link: new HttpLink({ uri: "https://tm3hdgc5-3000.asse.devtunnels.ms/" }),
  cache: new InMemoryCache(),
});

export default client;
