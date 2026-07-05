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
import { Ionicons } from "@react-native-vector-icons/ionicons";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
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
          renderItem={({ item }) => (
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

                    <Text style={styles.date}>@{item?.author[0].username}</Text>

                    <Text style={styles.date}>
                      •{dayjs().diff(dayjs(item?.createdAt), "hour")}h
                    </Text>
                  </View>

                  {/* caption */}
                  <Text
                    style={[
                      styles.postContent,
                      {
                        marginTop: 3,
                        marginBottom: 10,
                      },
                    ]}
                  >
                    {item.content}
                  </Text>
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
                    },
                  ]}
                />
              ) : null}
              <View style={styles.postFooter}>
                <Text>
                  {" "}
                  <Ionicons name="chatbubble-outline" size={15} />{" "}
                  {item.comments.length}
                </Text>

                <Text>
                  <Ionicons name="heart-outline" size={15} />{" "}
                  {item.likes.length}
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
        {/* add post */}

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
