import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  Alert,
  ActivityIndicator,
} from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { deleteItemAsync } from "expo-secure-store";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { useMutation, useQuery } from "@apollo/client/react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";

dayjs.extend(relativeTime);

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

const ADD_LIKE = gql`
  mutation LikePost($postId: ID) {
    likePost(postId: $postId) {
      username
      createdAt
      updatedAt
    }
  }
`;

export default function ProfileScreen({ route, navigation }) {
  const { setIsSignedIn, profileID, setProfileID } =
    useContext(AuthContext);

  const selectedProfile = route?.params?._id;

  const userId = selectedProfile || profileID;

  const {
    loading,
    error,
    data,
  } = useQuery(GET_PROFILE, {
    variables: {
      id: userId,
    },
    skip: !userId,
  });

  const {
    loading: postLoading,
    error: postError,
    data: postData,
  } = useQuery(GET_POSTS);

  const { data: myProfileData } = useQuery(GET_PROFILE, {
    variables: {
      id: profileID,
    },
    skip: !profileID,
  });

  const [follow] = useMutation(FOLLOW);

  const [newLike] = useMutation(ADD_LIKE);

  const user = data?.getUserById;

  const usernameLogin =
    myProfileData?.getUserById?.username;

  const posts =
    postData?.getPosts?.filter((post) => {
      return post.authorId === userId;
    }) || [];

  const isMyProfile = userId === profileID;

  const isFollowing =
    myProfileData?.getUserById?.following?.some(
      (followingUser) => {
        return followingUser._id === userId;
      },
    );

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
      await follow({
        variables: {
          followingId: userId,
        },
        refetchQueries: [
          {
            query: GET_PROFILE,
            variables: {
              id: userId,
            },
          },
          {
            query: GET_PROFILE,
            variables: {
              id: profileID,
            },
          },
        ],
        awaitRefetchQueries: true,
      });

      Alert.alert("Followed");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  async function handleLike(postId) {
    try {
      await newLike({
        variables: {
          postId,
        },
        refetchQueries: ["getPost"],
        awaitRefetchQueries: true,
      });
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  if ((loading || postLoading) && !data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#fff",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <FlatList
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
      contentContainerStyle={{
        paddingBottom: 30,
      }}
      showsVerticalScrollIndicator={false}
      data={posts}
      keyExtractor={(item) => item._id}
      ListHeaderComponent={
        <View>
          {/* profile header */}

          <View
            style={{
              paddingHorizontal: 20,
              paddingTop: 25,
              paddingBottom: 20,
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "space-between",
              }}
            >
              <Image
                source={{
                  uri: "https://i.pravatar.cc/200",
                }}
                style={{
                  width: 82,
                  height: 82,
                  borderRadius: 41,
                }}
              />

              <TouchableOpacity
                onPress={
                  isMyProfile
                    ? handleLogout
                    : handleFollow
                }
                style={{
                  minWidth: 120,
                  height: 44,
                  paddingHorizontal: 24,
                  borderRadius: 25,
                  backgroundColor: "#0F1419",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Text
                  style={{
                    color: "#fff",
                    fontSize: 16,
                    fontWeight: "700",
                  }}
                >
                  {isMyProfile
                    ? "Logout"
                    : isFollowing
                      ? "Following"
                      : "Follow"}
                </Text>
              </TouchableOpacity>
            </View>

            <Text
              style={{
                fontSize: 27,
                fontWeight: "800",
                color: "#0F1419",
                marginTop: 16,
              }}
              numberOfLines={1}
            >
              {user?.name}
            </Text>

            <Text
              style={{
                fontSize: 17,
                color: "#536471",
                marginTop: 2,
              }}
              numberOfLines={1}
            >
              @{user?.username}
            </Text>

            {/* following follower */}

            <View
              style={{
                flexDirection: "row",
                alignItems: "center",
                marginTop: 20,
                gap: 20,
              }}
            >
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Followings", {
                    _id: userId,
                  })
                }
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#536471",
                  }}
                >
                  <Text
                    style={{
                      color: "#0F1419",
                      fontWeight: "700",
                    }}
                  >
                    {user?.following?.length || 0}
                  </Text>{" "}
                  Following
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Followers", {
                    _id: userId,
                  })
                }
              >
                <Text
                  style={{
                    fontSize: 16,
                    color: "#536471",
                  }}
                >
                  <Text
                    style={{
                      color: "#0F1419",
                      fontWeight: "700",
                    }}
                  >
                    {user?.follower?.length || 0}
                  </Text>{" "}
                  Followers
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* posts tab */}

          <View
            style={{
              height: 55,
              borderBottomWidth: 1,
              borderBottomColor: "#EFF3F4",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Text
              style={{
                fontSize: 16,
                fontWeight: "700",
                color: "#0F1419",
              }}
            >
              Posts
            </Text>

            <View
              style={{
                position: "absolute",
                bottom: 0,
                width: 65,
                height: 4,
                borderRadius: 10,
                backgroundColor: "#1D9BF0",
              }}
            />
          </View>
        </View>
      }
      ListEmptyComponent={
        <View
          style={{
            alignItems: "center",
            paddingVertical: 60,
          }}
        >
          <Text
            style={{
              fontSize: 20,
              fontWeight: "700",
              color: "#0F1419",
            }}
          >
            No posts yet
          </Text>
        </View>
      }
      renderItem={({ item }) => {
        const isLiked = item.likes.some((like) => {
          return like.username === usernameLogin;
        });

        return (
          <TouchableOpacity
            activeOpacity={0.9}
            onPress={() =>
              navigation.navigate("Detail", {
                _id: item._id,
              })
            }
            style={{
              paddingHorizontal: 16,
              paddingVertical: 16,
              borderBottomWidth: 1,
              borderBottomColor: "#EFF3F4",
              backgroundColor: "#fff",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
              }}
            >
              <Image
                source={{
                  uri: "https://i.pravatar.cc/150",
                }}
                style={styles.avatar}
              />

              <View
                style={{
                  flex: 1,
                  marginLeft: 10,
                  minWidth: 0,
                }}
              >
                {/* name username time */}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    flexWrap: "wrap",
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "700",
                      color: "#0F1419",
                      marginRight: 5,
                    }}
                    numberOfLines={1}
                  >
                    {item?.author[0]?.name}
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      color: "#536471",
                      flexShrink: 1,
                    }}
                    numberOfLines={1}
                  >
                    @{item?.author[0]?.username}
                  </Text>

                  <Text
                    style={{
                      fontSize: 15,
                      color: "#536471",
                    }}
                  >
                    {" "}
                    · {dayjs(item?.createdAt).fromNow()}
                  </Text>
                </View>

                {/* content */}

                <Text
                  style={{
                    fontSize: 16,
                    color: "#0F1419",
                    lineHeight: 22,
                    marginTop: 4,
                  }}
                >
                  {item.content}
                </Text>

                {/* image */}

                {item.imgUrl ? (
                  <Image
                    source={{
                      uri: item.imgUrl,
                    }}
                    style={{
                      width: "100%",
                      height: 220,
                      borderRadius: 16,
                      marginTop: 12,
                    }}
                    resizeMode="cover"
                  />
                ) : null}

                {/* footer */}

                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    marginTop: 14,
                    gap: 35,
                  }}
                >
                  <View
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name="chatbubble-outline"
                      size={18}
                      color="#536471"
                    />

                    <Text
                      style={{
                        marginLeft: 5,
                        color: "#536471",
                      }}
                    >
                      {item.comments.length}
                    </Text>
                  </View>

                  <TouchableOpacity
                    onPress={(event) => {
                      event.stopPropagation();

                      handleLike(item._id);
                    }}
                    style={{
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Ionicons
                      name={
                        isLiked
                          ? "heart"
                          : "heart-outline"
                      }
                      size={19}
                      color={
                        isLiked ? "red" : "#536471"
                      }
                    />

                    <Text
                      style={{
                        marginLeft: 5,
                        color: isLiked
                          ? "red"
                          : "#536471",
                      }}
                    >
                      {item.likes.length}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            </View>
          </TouchableOpacity>
        );
      }}
    />
  );
}