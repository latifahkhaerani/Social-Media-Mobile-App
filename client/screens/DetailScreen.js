import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
  Alert,
} from "react-native";
import styles from "../app.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useMutation, useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { useContext, useState } from "react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { AuthContext } from "../context/AuthContext";

dayjs.extend(relativeTime);

const GET_DETAIL = gql`
  query GetPostById($id: ID) {
    getPostById(_id: $id) {
      _id
      content
      tags
      imgUrl
      authorId
      comments {
        username
        updatedAt
        createdAt
        content
        name
      }
      likes {
        username
      }
      createdAt
      updatedAt
      author {
        username
        _id
        name
      }
    }
  }
`;

const ADD_COMMENT = gql`
  mutation CommentPost($postId: ID, $content: String) {
    commentPost(postId: $postId, content: $content) {
      content
      username
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

const GET_PROFILE = gql`
  query GetUserById($id: ID) {
    getUserById(_id: $id) {
      _id
      username
    }
  }
`;

export default function DetailScreen({ route, navigation }) {
  const { _id } = route.params;
  // show button like by me
  const { profileID } = useContext(AuthContext);

  const { data: profileData } = useQuery(GET_PROFILE, {
    variables: {
      id: profileID,
    },
    skip: !profileID,
  });

  // console.log(_id);
  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      id: _id,
    },
    // fetchPolicy: "network-only",
  });

  // console.log(data?.getPostById);
  const item = data?.getPostById;

  // liked by me
  const usernameLogin = profileData?.getUserById?.username;
  const isLiked = item?.likes?.some((like) => like.username === usernameLogin);

  // comment
  const [myComment, setMyComment] = useState("");
  const [
    newComment,
    { loading: loadingComment, data: dataComment, error: errorComment },
  ] = useMutation(ADD_COMMENT);

  // like
  const [newLike, { loading: loadingLike, data: dataLike, error: errorLike }] =
    useMutation(ADD_LIKE);

  async function handleComment() {
    try {
      const addComment = await newComment({
        variables: {
          postId: _id,
          content: myComment,
        },
        refetchQueries: ["GetPostById"],
        awaitRefetchQueries: true,
      });
      // console.log(addComment, "?");
      setMyComment("");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  // like
  async function handleLike() {
    try {
      const addLike = await newLike({
        variables: {
          postId: _id,
        },
        refetchQueries: ["GetPostById"],
        awaitRefetchQueries: true,
      });

      // console.log(addLike, "like?");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  }

  return (
    <SafeAreaView
      edges={["left", "right", "bottom"]}
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* HEADER */}
      <View
        style={{
          height: 55,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 16,
          }}
        >
          <Ionicons name="arrow-back" size={28} color="#111" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          Post
        </Text>
      </View>

      <ScrollView
        style={{
          flex: 1,
          backgroundColor: "#fff",
        }}
        contentContainerStyle={{
          paddingBottom: 20,
        }}
      >
        {/* POST */}
        <View
          style={{
            paddingHorizontal: 16,
            paddingTop: 18,
          }}
        >
          {/* AUTHOR */}
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("UserProfile", {
                _id: item?.author[0]?._id,
              })
            }
            activeOpacity={0.7}
            style={{
              flexDirection: "row",
              alignItems: "center",
              gap: 3,
            }}
          >
            <Image
              source={{
                uri: "https://i.pravatar.cc/100",
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.username}>{item?.author[0]?.name}</Text>

              <Text style={styles.date}>@{item?.author[0]?.username}</Text>
            </View>
          </TouchableOpacity>

          {/* CONTENT */}
          <View
            style={{
              marginTop: 18,
              marginBottom: 15,
            }}
          >
            <Text
              style={[
                styles.content,
                {
                  marginBottom: 3,
                },
              ]}
            >
              {item?.content}
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

          {/* IMAGE */}
          {item?.imgUrl ? (
            <Image
              source={{
                uri: item.imgUrl,
              }}
              style={[
                styles.image,
                {
                  width: "100%",
                  borderRadius: 16,
                  // resizeMode: "cover",
                },
              ]}
            />
          ) : null}

          {/* CREATED AT */}
          <Text
            style={[
              styles.date,
              {
                marginTop: 10,
                // marginBottom: 9,
              },
            ]}
          >
            {dayjs(item?.createdAt).format("HH:mm · DD/MM/YY")}
          </Text>

          {/* COMMENT LIKE TAG */}
          <View
            style={[
              styles.postFooter,
              {
                marginLeft: 2,
                paddingVertical: 12,
                alignItems: "center",
              },
            ]}
          >
            <Text style={styles.profileUsername}>
              <Ionicons name="chatbubble-outline" size={20} color="#566573" />{" "}
              {item?.comments?.length}
            </Text>

            <TouchableOpacity onPress={handleLike}>
              <Text style={styles.profileUsername}>
                <Ionicons
                  name={isLiked ? "heart" : "heart-outline"}
                  size={20}
                  color={isLiked ? "red" : "#566573"}
                />{" "}
                {item?.likes?.length}
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* COMMENTS */}
        {item?.comments?.map((c, idx) => {
          return (
            <View
              key={idx}
              style={{
                flexDirection: "row",
                alignItems: "flex-start",
                paddingHorizontal: 16,
                paddingVertical: 15,
                borderBottomWidth: 1,
                borderBottomColor: "#e5e7eb",
                gap: 10,
              }}
            >
              <Image
                source={{
                  uri: "https://i.pravatar.cc/100",
                }}
                style={styles.avatar}
              />

              <View style={{ flex: 1 }}>
                {/* USERNAME */}
                <View
                  style={{
                    flexDirection: "row",
                    alignItems: "center",
                    gap: 5,
                    flexWrap: "wrap",
                  }}
                >
                  <Text style={styles.comment}>{c.username}</Text>

                  <Text style={styles.date}>@{c.name}</Text>

                  <Text style={styles.date}>
                    • {dayjs(c?.createdAt).fromNow()}
                  </Text>
                </View>

                {/* COMMENT */}
                <Text
                  style={{
                    marginTop: 3,
                    fontSize: 16,
                    lineHeight: 21,
                  }}
                >
                  {c.content}
                </Text>
              </View>
            </View>
          );
        })}
      </ScrollView>
      <View
        style={{
          backgroundColor: "#fff",
          borderTopWidth: 1,
          borderTopColor: "#e5e7eb",
          paddingHorizontal: 12,
          paddingTop: 10,
          paddingBottom: 8,
        }}
      >
        {/* REPLYING TO */}
        <Text
          style={{
            color: "#657786",
            fontSize: 14,
            marginBottom: 8,
          }}
        >
          Replying to{" "}
          <Text
            style={{
              color: "#1f99f0",
            }}
          >
            @{item?.author[0]?.username}
          </Text>
        </Text>

        <View
          style={{
            flexDirection: "col",
            // alignItems: "center",
            gap: 10,
          }}
        >
          {/* INPUT */}
          <TextInput
            onChangeText={setMyComment}
            value={myComment}
            placeholder="Post your reply"
            placeholderTextColor="#5b6773"
            style={[
              styles.commentCard,
              {
                flex: 1,
                margin: 0,
                minHeight: 45,
                paddingHorizontal: 16,
              },
            ]}
          />

          {/* REPLY BUTTON */}
          <TouchableOpacity
            onPress={handleComment}
            disabled={!myComment.trim() || loadingComment}
            style={{
              backgroundColor: myComment.trim() ? "#1f99f0" : "#bfe3fa",
              borderRadius: 100,
              paddingVertical: 10,
              paddingHorizontal: 18,
              display: myComment.trim() ? "block" : "none",
            }}
          >
            <Text
              style={{
                color: "#fff",
                fontWeight: "700",
              }}
            >
              Reply
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}
