import { NavigationContainer } from "@react-navigation/native";
import MainNavigator from "./navigators/MainNavigator";
import client from "./config/apollo";
import { ApolloProvider } from "@apollo/client/react";
import AuthContextProvider from "./context/AuthContext";

export default function App() {
  return (
    <>
      <AuthContextProvider>
        <ApolloProvider client={client}>
          <NavigationContainer>
            <MainNavigator />
          </NavigationContainer>
        </ApolloProvider>
      </AuthContextProvider>
    </>
  );
}
