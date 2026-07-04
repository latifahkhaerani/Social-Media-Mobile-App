import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { deleteItemAsync, getItem } from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation, useQuery } from "@apollo/client/react";

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
const FOLLOW = gql`
  mutation Follow($followingId: ID) {
    follow(followingId: $followingId) {
      _id
      followingId
      followerId
      createdAt
      updatedAt
    }
  }
`;

export default function ProfileScreen({ route, navigation }) {
  const { setIsSignedIn, profileID, setProfileID } = useContext(AuthContext);

  // from search
  const selectedProfile = route?.params?._id;

  const userId = selectedProfile || profileID;

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      id: userId,
    },
    // Kalau userId belum ada, query GET_PROFILE TIDAK dijalankan
    skip: !userId,
  });

  // ambil postingannya
  const {
    loading: postLoading,
    error: postError,
    data: postData,
  } = useQuery(GET_POSTS);

  // follow
  const [follow] = useMutation(FOLLOW);

  // console.log(postData?.getPosts?.filter(),'autt');
  // console.log( profileID, "id");
  const posts = postData?.getPosts?.filter((x) => {
    return x.authorId === userId;
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

  async function handleFollow() {
    try {
      const result = await follow({
        variables: {
          followingId: selectedProfile,
        },
        refetchQueries: [
          {
            query: GET_PROFILE,
            variables: {
              id: userId,
            },
          },
        ],
        awaitRefetchQueries: true,
      });

      Alert.alert("followed");
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
            @{data?.getUserById?.username}
          </Text>

          <View style={styles.profileInfo}>
            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>
                {/* {console.log(data?.getUserById, 'apaa?')} */}
                {data?.getUserById?.following?.length}
              </Text>
              <Text>Following</Text>
            </View>

            <View style={styles.infoItem}>
              <Text style={styles.infoNumber}>
                {data?.getUserById?.follower?.length}
              </Text>
              <Text>Followers</Text>
            </View>
          </View>

          <TouchableOpacity
            style={styles.logoutButton}
            onPress={userId === profileID ? handleLogout : handleFollow}
          >
            <Text style={styles.logoutText}>
              {userId === profileID ? "Logout" : "Follow"}
            </Text>
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
