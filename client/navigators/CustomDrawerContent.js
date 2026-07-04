import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { DrawerContentScrollView } from "@react-navigation/drawer";
import { useContext } from "react";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import { AuthContext } from "../context/AuthContext";

const GET_PROFILE = gql`
  query GetUserById($id: ID) {
    getUserById(_id: $id) {
      _id
      name
      username
      following {
        _id
      }
      follower {
        _id
      }
    }
  }
`;

export default function CustomDrawerContent(props) {
  const { profileID } = useContext(AuthContext);

  const { data } = useQuery(GET_PROFILE, {
    variables: {
      id: profileID,
    },
    skip: !profileID,
  });

  const user = data?.getUserById;

  return (
    <DrawerContentScrollView {...props}>
      <View style={styles.container}>
        <Image
          source={{
            uri: "https://i.pravatar.cc/200",
          }}
          style={styles.avatar}
        />

        <Text style={styles.name}>{user?.name}</Text>

        <Text style={styles.username}>@{user?.username}</Text>

        <View style={styles.followContainer}>
          <TouchableOpacity>
            <Text style={styles.followText}>
              <Text style={styles.number}>{user?.following?.length || 0}</Text>{" "}
              Following
            </Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.followText}>
              <Text style={styles.number}>{user?.follower?.length || 0}</Text>{" "}
              Followers
            </Text>
          </TouchableOpacity>
        </View>

        <TouchableOpacity
          style={styles.menu}
          onPress={() => props.navigation.navigate("Profile")}
        >
          <Text style={styles.menuText}>Profile</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.menu}
          onPress={() => props.navigation.navigate("Profile")}
        >
          <Text style={styles.menuText}>Logout</Text>
        </TouchableOpacity>
      </View>
    </DrawerContentScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 20,
    paddingTop: 20,
  },

  avatar: {
    width: 55,
    height: 55,
    borderRadius: 30,
    marginBottom: 15,
  },

  name: {
    fontSize: 24,
    fontWeight: "bold",
  },

  username: {
    fontSize: 17,
    color: "#657786",
    marginTop: 4,
  },

  followContainer: {
    flexDirection: "row",
    marginTop: 25,
    marginBottom: 30,
    gap: 20,
  },

  number: {
    fontWeight: "bold",
    color: "#000",
  },

  followText: {
    fontSize: 16,
    color: "#657786",
  },

  menu: {
    paddingVertical: 15,
  },

  menuText: {
    fontSize: 21,
    fontWeight: "600",
  },
});
