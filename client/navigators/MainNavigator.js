import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen.js";
// import DetailsScreen from "../screens/DetailsScreen";
import LoginScreen from "../screens/LoginScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";
import MyTabNavigator from "./MyTabNavigator.js";
import DetailScreen from "../screens/DetailScreen.js";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />

      <Stack.Screen name="Home" component={MyTabNavigator} />
      <Stack.Screen name="Detail" component={DetailScreen} />
    </Stack.Navigator>
  );
}
