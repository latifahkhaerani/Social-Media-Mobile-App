import { View, Text, Image, FlatList, TouchableOpacity } from "react-native";
import styles from "../app.style";

export default function UserList({ data, navigation, myFollowing }) {
  return (
    <FlatList
      data={data || []}
      keyExtractor={(item) => item._id}
      contentContainerStyle={{
        paddingHorizontal: 20,
        paddingVertical: 15,
      }}
      renderItem={({ item }) => {
        const isFollowing = myFollowing?.some((user) => {
          return user._id === item._id;
        });

        return (
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Profile", {
                _id: item._id,
              })
            }
            style={{
              flexDirection: "row",
              alignItems: "center",
              paddingVertical: 12,
            }}
          >
            <Image
              source={{
                uri: "https://i.pravatar.cc/150",
              }}
              style={styles.avatar}
            />

            <View style={{ flex: 1 }}>
              <Text style={styles.username}>{item.name}</Text>

              <Text style={styles.date}>@{item.username}</Text>
            </View>

            <TouchableOpacity
              style={[
                styles.logoutButton,
                {
                  marginTop: 0,
                  marginBottom: 0,
                },
              ]}
            >
              <Text style={styles.logoutText}>
                {isFollowing ? "Following" : "Follow"}
              </Text>
            </TouchableOpacity>
          </TouchableOpacity>
        );
      }}
    />
  );
}
