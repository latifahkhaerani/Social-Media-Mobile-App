import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client/react";
import { useContext, useState } from "react";

const REGISTER = gql`
  mutation Register(
    $name: String
    $username: String
    $email: String
    $password: String
  ) {
    register(
      name: $name
      username: $username
      email: $email
      password: $password
    ) {
      _id
      name
      username
      email
    }
  }
`;

export default function RegisterScreen({ navigation }) {
  const { setIsSignedIn } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");

  const [register] = useMutation(REGISTER);

  async function handleSubmitRegis() {
    try {
      const result = await register({
        variables: {
          email: email,
          password: password,
          name: name,
          username: username,
        },
      });

      console.log(result);

      navigation.goBack("Login")
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SocialApp</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          placeholderTextColor="#999"
          onChangeText={(text) => setName(text)}
        />

        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#999"
          onChangeText={(text) => setUsername(text)}
        />

        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#999"
          onChangeText={(text) => setEmail(text)}
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
          onChangeText={(text) => setPassword(text)}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmitRegis}>
          <Text style={styles.buttonText}>Register</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => navigation.navigate("Login")}>
          <Text style={styles.register}>
            Already have an account? <Text style={styles.link}>Login</Text>
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
