import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import styles from "../app.style";
import { TouchableOpacity } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />

      <Text style={styles.logo}>SocialApp</Text>
      <Text style={styles.subtitle}>Welcome Back </Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Password"
          secureTextEntry
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            navigation.navigate("Home");
          }}
        >
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
