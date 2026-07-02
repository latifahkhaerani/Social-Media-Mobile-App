import { View, Text, TextInput, TouchableOpacity } from "react-native";
import styles from "../app.style";

export default function RegisterScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>SocialApp</Text>
      <Text style={styles.subtitle}>Create your account</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="Name"
          style={styles.input}
          placeholderTextColor="#999"
        />

        <TextInput
          placeholder="Username"
          style={styles.input}
          placeholderTextColor="#999"
        />

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

        <TouchableOpacity style={styles.button}>
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
