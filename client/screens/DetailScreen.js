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
import { useState } from "react";

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
      }
      likes {
        username
      }
      createdAt
      updatedAt
      author {
        username
        _id
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

export default function DetailScreen({ route }) {
  const { _id } = route.params;
  // console.log(_id);
  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      id: _id,
    },
    // fetchPolicy: "network-only",
  });

  // console.log(data?.getPostById);
  const item = data?.getPostById;

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
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        style={{ flex: 1, backgroundColor: "#F8F9FA" }}
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: 25,
        }}
      >
        <View style={styles.card}>
          <View style={styles.header}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/100",
              }}
              style={styles.avatar}
            />

            <View>
              <Text style={styles.username}>{item?.author[0]?.username}</Text>
              <Text style={styles.date}>
                {dayjs(item?.createdAt).fromNow()}
              </Text>
            </View>
          </View>

          <Text style={styles.content}>{item?.content}</Text>

          <Image
            source={{
              uri: item?.imgUrl,
            }}
            style={styles.image}
          />

          <View style={styles.info}>
            <TouchableOpacity onPress={handleLike}>
              <Text style={styles.like}>❤️ {item?.likes.length} Likes</Text>
            </TouchableOpacity>

            <Text style={styles.comments}>
              💬 {item?.comments?.length} Comments
            </Text>

            <Text style={styles.comments}> 🏷️ {item?.tags} </Text>
          </View>
        </View>

        <Text style={styles.commentTitle}>Comments</Text>

        {item?.comments.map((c, idx) => {
          // console.log(c);
          return (
            <View key={idx} style={styles.commentCard}>
              <Text style={styles.commentUser}>{c.username}</Text>
              <Text>{c.content}</Text>
            </View>
          );
        })}

        <TextInput
          onChangeText={setMyComment}
          value={myComment}
          placeholder="Write a comment..."
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleComment}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
