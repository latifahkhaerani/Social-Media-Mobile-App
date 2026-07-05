import { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Alert,
  Image,
} from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { useMutation, useQuery } from "@apollo/client/react";
import { SafeAreaView } from "react-native-safe-area-context";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import BottomSheet from "../components/BottomSheet";

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

  // modal
  const [openModal, setOpenModal] = useState(null);

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
      navigation.navigate("Feed");
    } catch (error) {
      console.log(error);
      Alert.alert(error.message);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#fff" }}>
      <View style={{ flex: 1, justifyContent: "space-between", height: 100 }}>
        <View>
          {/* button */}
          <View
            style={[
              styles.header,
              {
                flexDirection: "row",
                justifyContent: "space-between",
                marginHorizontal: 20,
              },
            ]}
          >
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <Text style={[styles.postContent, { marginBottom: 0 }]}>
                Cancel
              </Text>
            </TouchableOpacity>
            {/* post */}
            <TouchableOpacity
              style={{
                backgroundColor: "#1f99f0",
                borderRadius: 100,
                padding: 8,
                paddingHorizontal: 18,
              }}
              onPress={handleSubmit}
            >
              <Text style={styles.buttonText}>Post</Text>
            </TouchableOpacity>
          </View>
          {/* content */}

          <View style={{ flexDirection: "row", marginLeft: 12 }}>
            <Image
              source={{
                uri: "https://i.pravatar.cc/200",
              }}
              style={[styles.avatar]}
            />
            <TextInput
              placeholder="What's happening?"
              multiline
              numberOfLines={5}
              value={content}
              onChangeText={setContent}
              style={{ fontSize: 18 }}
            />
          </View>
        </View>
        {/* tabs */}
        <View style={styles.addpostFooter}>
          <TouchableOpacity
            style={{ marginLeft: 25 }}
            onPress={() => setOpenModal("image")}
          >
            <Ionicons name="image-outline" size={20} color="#1f99f0" />
          </TouchableOpacity>

          <TouchableOpacity onPress={() => setOpenModal("tags")}>
            <Ionicons name="pricetags-outline" size={19} color="#1f99f0" />
          </TouchableOpacity>
        </View>
      </View>
      <BottomSheet
        visible={openModal !== null}
        onClose={() => setOpenModal(null)}
        title={openModal === "image" ? "Add Image" : "Add Tags"}
      >
        {openModal === "image" ? (
          <TextInput
            placeholder="Image URL"
            value={imgUrl}
            onChangeText={setImgUrl}
            style={styles.input}
          />
        ) : (
          <TextInput
            placeholder="Tags"
            value={tags}
            onChangeText={setTags}
            style={styles.input}
          />
        )}
      </BottomSheet>
    </SafeAreaView>
  );
}
