import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import HomeScreen from "../screens/HomeScreen.js";
import SearchScreen from "../screens/SearchScreen.js";
import CreatePostScreen from "../screens/CreatePostScreen.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { SafeAreaView } from "react-native-safe-area-context";
import MyDrawer from "./MyDrawerNavigator.js";
import MyDrawerNavigator from "./MyDrawerNavigator.js";
import DetailScreen from "../screens/DetailScreen.js";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import FollowerList from "../screens/FollowerList.js";
import FollowingList from "../screens/FollowingList.js";

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

function HomeStack() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="HomeScreen" component={HomeScreen} />
      <Stack.Screen
        name="Detail"
        component={DetailScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen name="Profile" component={ProfileScreen} />
      <Stack.Screen
        name="Followers"
        component={FollowerList}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
      <Stack.Screen
        name="Followings"
        component={FollowingList}
        options={{
          headerShown: false,
          animation: "none",
        }}
      />
    </Stack.Navigator>
  );
}

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
        <Tab.Screen name="Home" component={HomeStack} />
        {/* <Tab.Screen name="Drawer" component={MyDrawerNavigator} /> */}
        <Tab.Screen name="Search" component={SearchScreen} />
        {/* <Tab.Screen name="Add Post" component={CreatePostScreen} /> */}
      </Tab.Navigator>
    </SafeAreaView>
  );
}
