import { StatusBar } from "expo-status-bar";
import { Button, StyleSheet, Text, TextInput, View } from "react-native";
import styles from "./app.style";

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
      <StatusBar style="auto" />

      <View style={{ flex: 1, alignItems: "center", justifyContent: "center" }}>
        <Text>Login Screen</Text>
        <TextInput style={styles.textInput} placeholder="Username" />
        <TextInput
          style={styles.textInput}
          placeholder="Password"
          secureTextEntry
        />
        <Button
          title="Submit"
          onPress={() => navigation.navigate("Home", { screen: "Posts" })}
        />
      </View>
    </View>
  );
}
