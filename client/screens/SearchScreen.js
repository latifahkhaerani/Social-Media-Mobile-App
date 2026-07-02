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

export default function SearchScreen() {
  const [keyword, setKeyword] = useState("");

  // dummy data
  const users = [
    {
      _id: "1",
      name: "Lala",
      username: "Lala",
    },
    {
      _id: "2",
      name: "Andi",
      username: "andi",
    },
    {
      _id: "3",
      name: "Budi",
      username: "budii",
    },
  ];

  const filteredUsers = users.filter(
    (user) =>
      user.name.toLowerCase().includes(keyword.toLowerCase()) ||
      user.username.toLowerCase().includes(keyword.toLowerCase()),
  );

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
        data={filteredUsers}
        keyExtractor={(item) => item._id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.userCard}>
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
