import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigators/MainNavigator";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client/react";

export default function App() {
  return (
    <>
      <ApolloProvider client={client}>
        <NavigationContainer>
          <MainNavigator />
        </NavigationContainer>
      </ApolloProvider>
    </>
  );
}
