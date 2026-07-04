import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";

const ADD_POST = gql`
  mutation AddPost($content: String, $tags: [String], $imgUrl: String) {
    addPost(content: $content, tags: $tags, imgUrl: $imgUrl) {
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

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const [newPost, { loading, error, data }] = useMutation(ADD_POST, {
    refetchQueries: ["getPost"],
    awaitRefetchQueries: true,
  });

  const handleSubmit = async () => {
    try {
      if (!content) {
        return Alert.alert("Error", "Content is required");
      }

      const addPost = await newPost({
        variables: {
          content: content,
          tags: tags.split(",").map((tag) => tag.trim()),
          imgUrl: imgUrl,
        },
      });

      // console.log(addPost, "??");

      setContent("");
      setImgUrl("");
      setTags("");
      Alert.alert("Success", "Post created!");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Create Post</Text>

      <View style={styles.card}>
        <TextInput
          placeholder="What's on your mind?"
          multiline
          numberOfLines={5}
          value={content}
          onChangeText={setContent}
          style={[styles.input, styles.textArea]}
        />

        <TextInput
          placeholder="Tags (optional)"
          value={tags}
          onChangeText={setTags}
          style={styles.input}
        />

        <TextInput
          placeholder="Image URL (optional)"
          value={imgUrl}
          onChangeText={setImgUrl}
          style={styles.input}
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>Post</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
