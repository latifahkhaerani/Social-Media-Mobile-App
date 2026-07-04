import { ApolloProvider } from "@apollo/client/react";
import { ApolloClient, HttpLink, InMemoryCache } from "@apollo/client";
import { SetContextLink } from "@apollo/client/link/context";
import { getItem } from "expo-secure-store";

const httpLink = new HttpLink({
  uri: "https://tm3hdgc5-3000.asse.devtunnels.ms/",
});

const authLink = new SetContextLink(({ headers }) => {
  // get the authentication token from local storage if it exists
  const token = getItem("token");
  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
