import { useState } from "react";
import {
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import styles from "../app.style";
import { gql } from "@apollo/client";
import { useLazyQuery, useQuery } from "@apollo/client/react";

const SEARCH_USER = gql`
  query SearchUser($name: String) {
    searchUser(name: $name) {
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

export default function SearchScreen({ navigation }) {
  const [keyword, setKeyword] = useState("");

  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: {
      name: keyword,
    },
    skip: keyword.trim() === "",
  });

  // console.log(data?.searchUser);

  return (
    <View style={styles.container}>
      {/* <Text style={styles.logo}>Search User</Text> */}

      <TextInput
        style={styles.input}
        placeholder="Search by name or username..."
        value={keyword}
        onChangeText={setKeyword}
      />

      <FlatList
        data={data?.searchUser}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("UserProfile", {
                _id: item._id,
              });
            }}
            style={styles.userCard}
          >
            <Image
              source={{
                uri: "https://i.pravatar.cc/150",
              }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.userUsername}>@{item.username}</Text>
            </View>

            <TouchableOpacity style={styles.followButton}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
    </View>
  );
}
