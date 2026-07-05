import {
  View,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { useContext, useState } from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { AuthContext } from "../context/AuthContext";
dayjs.extend(relativeTime);

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

const ADD_LIKE = gql`
  mutation LikePost($postId: ID) {
    likePost(postId: $postId) {
      username
      createdAt
      updatedAt
    }
  }
`;

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

export default function HomeScreen({ navigation }) {
  // like by me
  const { profileID } = useContext(AuthContext);

  const { loading, error, data } = useQuery(GET_POSTS);
  // console.log({
  //   loading,
  //   error,
  //   data,
  // });
  // console.log(data?.getPosts)

  // like by me
  const { data: profileData } = useQuery(GET_PROFILE, {
    variables: {
      id: profileID,
    },
    skip: !profileID,
  });

  // like
  const usernameLogin = profileData?.getUserById?.username;

  const [newLike, { loading: loadingLike, data: dataLike, error: errorLike }] =
    useMutation(ADD_LIKE);

  async function handleLike(postId) {
    try {
      const addLike = await newLike({
        variables: {
          postId,
        },
        refetchQueries: ["getPost"],
        awaitRefetchQueries: true,
      });

      console.log(addLike, "like?");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  if (loading && !data) {
    return (
      <View
        style={{
          flex: 1,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <ActivityIndicator size={"large"} />
        <Text>loading...</Text>
      </View>
    );
  }

  return (
    <>
      <View
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
      >
        <FlatList
          style={{ flex: 1, backgroundColor: "#F8F9FA" }}
          contentContainerStyle={{
            paddingBottom: 100,
          }}
          data={data?.getPosts || []}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => {
            const isLiked = item.likes.some(
              (like) => like.username === usernameLogin,
            );

            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Detail", {
                    _id: item._id,
                  })
                }
                style={{
                  paddingHorizontal: 16,
                  paddingVertical: 16,
                  borderBottomWidth: 1,
                  borderBottomColor: "#e5e7eb",
                  backgroundColor: "#fff",
                }}
              >
                <View style={styles.postHeader}>
                  <Image
                    source={{
                      uri: "https://i.pravatar.cc/150",
                    }}
                    style={styles.avatar}
                  />

                  <View style={{ flex: 1 }}>
                    {/* username */}
                    <View
                      style={{
                        flexDirection: "row",
                        gap: 5,
                        alignItems: "center",
                      }}
                    >
                      <Text
                        style={[
                          styles.username,
                          {
                            fontSize: 18,
                          },
                        ]}
                      >
                        {item?.author[0].name}
                      </Text>

                      <Text style={styles.date}>
                        @{item?.author[0].username}
                      </Text>

                      <Text style={styles.date}>
                        •{" "}
                        {dayjs(Number(item?.createdAt))
                          .fromNow(true)
                          .replace("a few seconds", "now")
                          .replace("a minute", "1m")
                          .replace(/(\d+) minutes?/, "$1m")
                          .replace("an hour", "1h")
                          .replace(/(\d+) hours?/, "$1h")
                          .replace("a day", "1d")
                          .replace(/(\d+) days?/, "$1d")
                          .replace("a month", "1mo")
                          .replace(/(\d+) months?/, "$1mo")
                          .replace("a year", "1y")
                          .replace(/(\d+) years?/, "$1y")}
                      </Text>
                    </View>

                    {/* caption */}
                    <Text style={{ fontSize: 16, marginTop: 5 }}>
                      {item.content}
                    </Text>
                    {/* TAGS */}
                    {item?.tags?.length > 0 ? (
                      <Text
                        style={{
                          fontSize: 15,
                          color: "#1f99f0",
                          lineHeight: 24,
                        }}
                      >
                        {item.tags.map((tag) => `#${tag}`).join(" ")}
                      </Text>
                    ) : null}
                  </View>
                </View>

                {item.imgUrl ? (
                  <Image
                    source={{ uri: item.imgUrl }}
                    style={[
                      styles.postImage,
                      {
                        marginLeft: 53,
                        width: "83%",
                        height: 200,
                        borderRadius: 16,
                        marginTop: 8,
                      },
                    ]}
                  />
                ) : null}
                {/* comment,like */}
                <View style={styles.postFooter}>
                  <Text>
                    {" "}
                    <Ionicons name="chatbubble-outline" size={15} />{" "}
                    {item.comments.length}
                  </Text>

                  <TouchableOpacity onPress={() => handleLike(item._id)}>
                    <Text>
                      <Ionicons
                        name={isLiked ? "heart" : "heart-outline"}
                        size={15}
                        color={isLiked ? "red" : "#657786"}
                      />{" "}
                      {item.likes.length}
                    </Text>
                  </TouchableOpacity>
                </View>
              </TouchableOpacity>
            );
          }}
        />
        {/* add post border button */}
        <TouchableOpacity
          onPress={() => navigation.navigate("AddPost")}
          style={{
            position: "absolute",
            right: 20,
            bottom: 25,
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#1f99f0",
            justifyContent: "center",
            alignItems: "center",

            shadowColor: "#000",
            shadowOffset: {
              width: 0,
              height: 3,
            },
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5,
          }}
        >
          <Ionicons name="add" size={35} color="#fff" />
        </TouchableOpacity>
      </View>
    </>
  );
}
