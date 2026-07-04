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
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

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

export default function HomeScreen({ navigation }) {
  const { loading, error, data } = useQuery(GET_POSTS);
  // console.log({
  //   loading,
  //   error,
  //   data,
  // });
  // console.log(data?.getPosts)
  if (loading) {
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
    <FlatList
      style={{ flex: 1, backgroundColor: "#F8F9FA" }}
      contentContainerStyle={{
        justifyContent: "center",
        paddingHorizontal: 25,
      }}
      data={data?.getPosts || []}
      keyExtractor={(item) => item._id}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.postCard}
          onPress={() => navigation.navigate("Detail", { _id: item._id })}
        >
          <View style={styles.postHeader}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/150",
              }}
              style={styles.avatar}
            />

            <Text style={styles.username}>{item?.author[0].username}</Text>
          </View>
          <Image
            source={{
              uri: item?.imgUrl,
            }}
            style={styles.image}
          />

          <Text style={styles.postContent}>{item.content}</Text>

          {item.imgUrl ? (
            <Image source={{ uri: item.imgUrl }} style={styles.postImage} />
          ) : null}

          <View style={styles.postFooter}>
            <Text>❤️ {item.likes.length}</Text>
            <Text>💬 {item.comments.length}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
