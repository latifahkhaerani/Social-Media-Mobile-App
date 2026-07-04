import { createDrawerNavigator } from "@react-navigation/drawer";
import MyTabNavigator from "./MyTabNavigator.js";
import ProfileScreen from "../screens/ProfileScreen.js";
import CustomDrawerContent from "./CustomDrawerContent.js";

const Drawer = createDrawerNavigator();

export default function MyDrawerNavigator() {
  return (
    <Drawer.Navigator
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="MainTabs"
        component={MyTabNavigator}
        options={{
          title: "",
          drawerItemStyle: {
            display: "none",
          },
        }}
      />
      <Drawer.Screen name="Profile" component={ProfileScreen} />
    </Drawer.Navigator>
  );
}
