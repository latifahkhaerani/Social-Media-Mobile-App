import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen.js";
import SearchScreen from "../screens/SearchScreen.js";
import CreatePostScreen from "../screens/CreatePostScreen.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import MyDrawer from "./MyDrawerNavigator.js";
import MyDrawerNavigator from "./MyDrawerNavigator.js";

const Tab = createBottomTabNavigator();

export default function MyTabNavigator() {
  return (
    <SafeAreaView style={{ flex: 1 }} edges={["bottom"]}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: "#0095F6",
          tabBarInactiveTintColor: "gray",
          tabBarStyle: {
            height: 60,
            paddingBottom: 8,
            paddingTop: 8,
          },

          tabBarIcon: ({ color, size, focused }) => {
            let iconName;
            if (route.name === "Posts") {
              iconName = focused ? "home" : "home-outline";
            } else if (route.name === "Search") {
              iconName = focused ? "search" : "search-outline";
            } else if (route.name === "Add Post") {
              iconName = focused ? "add-circle" : "add-circle-outline";
            } else if (route.name === "Profile") {
              iconName = focused ? "person" : "person-outline";
            }

            return <Ionicons name={iconName} size={size} color={color} />;
          },
        })}
      >
        <Tab.Screen name="Home" component={HomeScreen} />
        {/* <Tab.Screen name="Drawer" component={MyDrawerNavigator} /> */}
        <Tab.Screen name="Search" component={SearchScreen} />
        {/* <Tab.Screen name="Add Post" component={CreatePostScreen} /> */}
        <Tab.Screen name="Profile" component={ProfileScreen} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}
