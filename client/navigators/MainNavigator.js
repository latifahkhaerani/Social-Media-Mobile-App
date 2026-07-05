import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/HomeScreen.js";
// import DetailsScreen from "../screens/DetailsScreen";
import LoginScreen from "../screens/LoginScreen.js";
import RegisterScreen from "../screens/RegisterScreen.js";
import MyTabNavigator from "./MyTabNavigator.js";
import DetailScreen from "../screens/DetailScreen.js";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import MyDrawerNavigator from "./MyDrawerNavigator.js";
import CreatePostScreen from "../screens/CreatePostScreen.js";

const Stack = createNativeStackNavigator();

export default function MainNavigator() {
  const { isSignedIn } = useContext(AuthContext);

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {isSignedIn ? (
        <>
          {/* <Stack.Screen name="Home" component={MyTabNavigator} /> */}
          <Stack.Screen name="Feed" component={MyDrawerNavigator} />
          {/* <Stack.Screen name="Detail" component={DetailScreen} /> */}
          <Stack.Screen name="UserProfile" component={ProfileScreen} />
          <Stack.Screen name="AddPost" component={CreatePostScreen} />
        </>
      ) : (
        <>
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          {/* <Stack.Screen name="Profile" component={ProfileScreen} /> */}
        </>
      )}
    </Stack.Navigator>
  );
}
