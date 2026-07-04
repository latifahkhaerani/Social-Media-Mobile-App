import { StatusBar } from "expo-status-bar";
import { Alert, Button, StyleSheet, Text, TextInput, View } from "react-native";
import styles from "../app.style";
import { TouchableOpacity } from "react-native";
import { AuthContext } from "../context/AuthContext";
import { Token } from "graphql";
import { gql } from "@apollo/client";
import { useContext, useState } from "react";
import { useMutation } from "@apollo/client/react";
import { setItem } from "expo-secure-store";

const LOGIN = gql`
  mutation Login($email: String, $password: String) {
    login(email: $email, password: $password) {
      message
      token
      _id
    }
  }
`;

export default function LoginScreen({ navigation }) {
  const { setIsSignedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [login] = useMutation(LOGIN);

  async function handleSubmitLogin() {
    try {
      const result = await login({
        variables: {
          email: email,
          password: password,
        },
      });

      // console.log(result,'ress')
      const token = result.data.login.token;

      setItem("token", token);

      setIsSignedIn(true);
    } catch (error) {
      Alert.alert(err.message);
      console.log(error);
    }
  }

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.logo}>SocialApp</Text>
      <Text style={styles.subtitle}>Welcome Back </Text>

      <View style={styles.card}>
        <TextInput
          onChangeText={(text) => setEmail(text)}
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmitLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Register")}>
          <Text style={styles.register}>
            Don't have an account? <Text style={styles.link}>Register</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
