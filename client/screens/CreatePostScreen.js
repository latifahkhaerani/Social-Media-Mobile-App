import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import styles from "../app.style";

export default function CreatePostScreen({ navigation }) {
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [imgUrl, setImgUrl] = useState("");

  const handleSubmit = () => {
    if (!content) {
      return Alert.alert("Error", "Content is required");
    }

    console.log({
      content,
      tags,
      imgUrl,
    });

    // nanti diganti mutation Apollo

    Alert.alert("Success", "Post created!");

    setContent("");
    setTags("");
    setImgUrl("");

    // navigation.goBack();
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
