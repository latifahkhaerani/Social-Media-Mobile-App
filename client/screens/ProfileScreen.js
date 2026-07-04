import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { deleteItemAsync, getItem } from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useQuery } from "@apollo/client/react";

const GET_PROFILE = gql`
  query GetUserById($id: ID) {
    getUserById(_id: $id) {
      _id
      name
      username
      email
      following {
        _id
        name
        username
        email
      }
      follower {
        _id
        name
        username
        email
      }
    }
  }
`;

const GET_POSTS = gql`
  query getPost {
    getPosts {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        content
        username
        createdAt
        updatedAt
      }
      likes {
        username
        createdAt
        updatedAt
      }
      createdAt
      updatedAt
      author {
        _id
        name
        username
        email
      }
    }
  }
`;

export default function ProfileScreen({ navigation }) {
  const { setIsSignedIn, profileID, setProfileID } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      id: profileID,
    },
    // Kalau profileID belum ada, query GET_PROFILE TIDAK dijalankan
    skip: !profileID,
  });

  // ambil postingannya
  const {
    loading: postLoading,
    error: postError,
    data: postData,
  } = useQuery(GET_POSTS);

  // console.log(postData?.getPosts?.filter(),'autt');
  // console.log( profileID, "id");
  const posts = postData?.getPosts?.filter((x) => {
    return x.authorId === profileID;
  });

  async function handleLogout() {
    try {
      await deleteItemAsync("token");
      setIsSignedIn(false);
      setProfileID(null);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingTop: 30,
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
      data={posts}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={() => (
        <View style={styles.profileHeader}>
          <Image
            source={{
              uri: "https://i.pravatar.cc/200",
            }}
            style={styles.profileImage}
          />

          <Text style={styles.profileName}>{data?.getUserById.name}</Text>

          <Text style={styles.profileUsername}>
            @{data?.getUserById.username}
          </Text>

          <View style={styles.profileInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>
                {data?.getUserById.following.length}
              </Text>
              <Text>Following</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>
                {data?.getUserById.follower.length}
              </Text>
              <Text>Followers</Text>
            </View>
          </View>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.logoutText}>Logout</Text>
          </TouchableOpacity>

          <Text style={styles.sectionTitle}>Posts</Text>
        </View>
      )}
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate("Detail", { _id: item._id })}
          style={styles.postCard}
        >
          <View style={styles.postHeader}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150",
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.username}>{item?.author[0].username}</Text>

              <Text style={styles.date}>@{item?.author[0].username}</Text>
            </View>
          </View>

          <Text style={styles.postContent}>{item.content}</Text>

          {item.imgUrl && (
            <Image
              source={{
                uri: item.imgUrl,
              }}
              style={styles.image}
            />
          )}

          <View style={styles.postFooter}>
            <Text>💬 {item.comments.length}</Text>

            <Text>♡ {item.likes.length}</Text>

            <Text>↗</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
