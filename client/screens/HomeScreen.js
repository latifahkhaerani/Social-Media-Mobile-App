import { View, FlatList, Text, TouchableOpacity, Image } from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useState } from "react";

const dummyPosts = [
  {
    id: "1",
    username: "lala",
    content: "Belajar React Native hari ini 🚀",
    imgUrl: "https://picsum.photos/400/250",
    likes: 10,
    comments: 3,
  },
  {
    id: "2",
    username: "andi",
    content: "GraphQL ternyata enak juga dipakai.",
    imgUrl: "https://picsum.photos/401/250",
    likes: 25,
    comments: 7,
  },
];

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

  console.log({
    loading,
    error,
    data,
  });

  // console.log(data?.getPosts)

  const [post, setPost] = useState([]);

  console.log(data);
  return (
    <FlatList
      style={{ flex: 1, backgroundColor: "#F8F9FA" }}
      contentContainerStyle={{
        justifyContent: "center",
        paddingHorizontal: 25,
      }}
      data={data?.getPosts}
      keyExtractor={(item) => item.id}
      // ListHeaderComponent={<Text style={styles.logo}>SocialApp</Text>}
      renderItem={({ item }) => (
        <TouchableOpacity
          style={styles.postCard}
          onPress={() => navigation.navigate("Details", { id: item.id })}
        >
          <View style={styles.postHeader}>
            <Image
              source={{ uri: "https://i.pravatar.cc/100" }}
              style={styles.avatar}
            />

            <Text style={styles.username}>{item.username}</Text>
          </View>

          <Text style={styles.postContent}>{item.content}</Text>

          <Image source={{ uri: item.imgUrl }} style={styles.postImage} />

          <View style={styles.postFooter}>
            <Text>❤️ {item.likes}</Text>
            <Text>💬 {item.comments}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
}
