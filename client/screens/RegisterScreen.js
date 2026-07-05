import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";
import { useMutation } from "@apollo/client/react";
import { useContext, useState } from "react";
import { StatusBar } from "expo-status-bar";

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

      // console.log(result);
      navigation.goBack("Login");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
        paddingHorizontal: 22,
        paddingTop: 45,
        paddingBottom: 25,
      }}
    >
      <StatusBar style="dark" />

      {/* CONTENT */}
      <View>
        {/* TITLE */}
        <Text
          style={[
            styles.logo,
            {
              textAlign: "left",
              fontSize: 38,
              marginTop: 55,
              marginBottom: 12,
            },
          ]}
        >
          Create your account
        </Text>

        <Text
          style={[
            styles.profileUsername,
            {
              fontSize: 18,
              marginBottom: 35,
            },
          ]}
        >
          Join X and see what's happening
        </Text>

        {/* NAME */}
        <TextInput
          placeholder="Name"
          placeholderTextColor="#b0b0b0"
          onChangeText={(text) => setName(text)}
          style={{
            fontSize: 22,
            color: "#0F1419",
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#EFF3F4",
            marginBottom: 12,
          }}
        />

        {/* USERNAME */}
        <TextInput
          placeholder="Username"
          placeholderTextColor="#b0b0b0"
          autoCapitalize="none"
          onChangeText={(text) => setUsername(text)}
          style={{
            fontSize: 22,
            color: "#0F1419",
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#EFF3F4",
            marginBottom: 12,
          }}
        />

        {/* EMAIL */}
        <TextInput
          placeholder="Email"
          placeholderTextColor="#b0b0b0"
          keyboardType="email-address"
          autoCapitalize="none"
          onChangeText={(text) => setEmail(text)}
          style={{
            fontSize: 22,
            color: "#0F1419",
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#EFF3F4",
            marginBottom: 12,
          }}
        />

        {/* PASSWORD */}
        <TextInput
          placeholder="Password"
          placeholderTextColor="#b0b0b0"
          secureTextEntry
          onChangeText={(text) => setPassword(text)}
          style={{
            fontSize: 22,
            color: "#0F1419",
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#EFF3F4",
          }}
        />
      </View>

      {/* BOTTOM */}
      <View
        style={{
          marginTop: "auto",
          marginBottom: 20,
        }}
      >
        <TouchableOpacity
          onPress={handleSubmitRegis}
          style={{
            backgroundColor: "#000",
            borderRadius: 100,
            paddingVertical: 16,
            alignItems: "center",
          }}
        >
          <Text
            style={[
              styles.buttonText,
              {
                fontSize: 20,
              },
            ]}
          >
            Create account
          </Text>
        </TouchableOpacity>

        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
            marginVertical: 25,
          }}
        >
          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#CFD9DE",
            }}
          />

          <Text
            style={[
              styles.profileUsername,
              {
                marginHorizontal: 12,
              },
            ]}
          >
            OR
          </Text>

          <View
            style={{
              flex: 1,
              height: 1,
              backgroundColor: "#CFD9DE",
            }}
          />
        </View>

        <TouchableOpacity
          onPress={() => navigation.navigate("Login")}
          style={[
            styles.logoutButton,
            {
              alignSelf: "stretch",
              marginTop: 0,
              marginBottom: 0,
              paddingVertical: 15,
            },
          ]}
        >
          <Text
            style={[
              styles.logoutText,
              {
                fontSize: 18,
              },
            ]}
          >
            Log in to existing account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
