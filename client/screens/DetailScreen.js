import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../app.style";
import { SafeAreaView } from "react-native-safe-area-context";
import { useQuery } from "@apollo/client/react";
import { gql } from "@apollo/client";

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
export default function DetailScreen({ route }) {
  const { _id } = route.params;
  // console.log(_id);
  const { loading, error, data } = useQuery(GET_DETAIL, {
    variables: {
      id: _id,
    },
  });

  console.log(data?.getPostById);

  const item = data?.getPostById;

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
              <Text style={styles.date}>{item?.createdAt} hours ago</Text>
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
            <Text style={styles.like}>❤️ {item?.likes.length} Likes</Text>
            <Text style={styles.comments}>
              💬 {item?.comments?.length} Comments
            </Text>

            <Text style={styles.comments}> 🏷️ {item?.tags} </Text>
          </View>
        </View>

        <Text style={styles.commentTitle}>Comments</Text>

        {item?.comments.map((c) => {
          console.log(c);
          return (
            <View style={styles.commentCard}>
              <Text style={styles.commentUser}>{c.username}</Text>
              <Text>{c.content}</Text>
            </View>
          );
        })}

        <TextInput placeholder="Write a comment..." style={styles.input} />

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Send</Text>
        </TouchableOpacity>
      </ScrollView>
    </SafeAreaView>
  );
}
