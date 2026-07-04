import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { deleteItemAsync } from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const posts = [
  {
    id: "1",
    content: "Hari ini belajar React Native 🚀",
    likes: 10,
    comments: 2,
  },
  {
    id: "2",
    content: "Apollo Client ternyata gampang.",
    likes: 25,
    comments: 8,
  },
  {
    id: "3",
    content: "GraphQL seru juga.",
    likes: 5,
    comments: 1,
  },
];
// const GET_PROFILE = gql`
//   query GetUserById($id: ID) {
//     getUserById(_id: $id) {
//       _id
//       name
//       username
//       email
//       following {
//         _id
//         name
//         username
//         email
//       }
//       follower {
//         _id
//         name
//         username
//         email
//       }
//     }
//   }
// `;
export default function ProfileScreen({ route }) {
  const { setIsSignedIn } = useContext(AuthContext);

  async function handleLogout() {
    try {
      await deleteItemAsync("token");
      setIsSignedIn(false);
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: "#F8F9FA",
      }}
      contentContainerStyle={{
        paddingHorizontal: 25,
        paddingTop: 30,
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
      data={posts}
      keyExtractor={(item) => item.id}
      ListHeaderComponent={() => (
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/200",
            }}
            style={styles.profileImage}
          />

          <Text style={styles.profileName}>Latifah</Text>

          <Text style={styles.profileUsername}>@latifah</Text>

          <Text style={styles.bio}>
            Fullstack Developer 🚀{"\n"}
            Love React Native ❤️
          </Text>

          <View style={styles.profileInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>120</Text>
              <Text>Followers</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>80</Text>
              <Text>Following</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>15</Text>
              <Text>Posts</Text>
            </View>
          </View>

          <Text style={styles.sectionTitle}>My Posts</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <>
          <View style={styles.postCard}>
            <Text style={styles.postContent}>{item.content}</Text>

            <View style={styles.postFooter}>
              <Text>❤️ {item.likes}</Text>
              <Text>💬 {item.comments}</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>
        </>
      )}
    />
  );
}
