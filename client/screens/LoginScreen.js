import { View, Text, Button, TextInput } from "react-native";

export default function LoginScreen({ navigation }) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Login Screen</Text>
      <TextInput placeholder="Username" />
      <TextInput placeholder="Password" secureTextEntry />
      <Button title="Submit" onPress={() => navigation.navigate('Home', { screen: 'Posts' })} />
    </View>
  );
}