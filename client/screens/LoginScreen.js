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
  const { setIsSignedIn, setProfileID } = useContext(AuthContext);
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
      const _id = result.data.login._id;
      // console.log(_id, 'dari login')

      await setItem("token", token);
      await setItem("_id", _id);

      setProfileID(_id);
      setIsSignedIn(true);
    } catch (error) {
      Alert.alert(error.message);
      console.log(error);
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
          Log in to X
        </Text>

        <Text
          style={[
            styles.profileUsername,
            {
              fontSize: 18,
              marginBottom: 45,
            },
          ]}
        >
          Continue with your existing account
        </Text>

        {/* EMAIL */}
        <TextInput
          onChangeText={(text) => setEmail(text)}
          value={email}
          placeholder="lala@example.com"
          placeholderTextColor="#b0b0b0"
          keyboardType="email-address"
          autoCapitalize="none"
          style={{
            fontSize: 25,
            color: "#0F1419",
            paddingVertical: 15,
            borderBottomWidth: 1,
            borderBottomColor: "#EFF3F4",
            marginBottom: 20,
          }}
        />

        {/* PASSWORD */}
        <TextInput
          onChangeText={(text) => setPassword(text)}
          value={password}
          placeholder="enter your password"
          placeholderTextColor="#b0b0b0"
          secureTextEntry
          style={{
            fontSize: 25,
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
          onPress={handleSubmitLogin}
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
            Continue
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
          onPress={() => navigation.navigate("Register")}
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
            Create a new account
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
