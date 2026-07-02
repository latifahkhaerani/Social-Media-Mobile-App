import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import styles from "../app.style";

export default function DetailScreen() {
  return (
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
            <Text style={styles.username}>latifah</Text>
            <Text style={styles.date}>2 hours ago</Text>
          </View>
        </View>

        <Text style={styles.content}>
          Hari ini belajar React Native dan Apollo Client. Ternyata seru juga
          bikin aplikasi social media 🚀
        </Text>

        <Image
          source={{
            uri: "https://picsum.photos/500/300",
          }}
          style={styles.image}
        />

        <View style={styles.info}>
          <Text style={styles.like}>❤️ 25 Likes</Text>
          <Text style={styles.comment}>💬 7 Comments</Text>
        </View>
      </View>

      <Text style={styles.commentTitle}>Comments</Text>

      <View style={styles.commentCard}>
        <Text style={styles.commentUser}>andi</Text>
        <Text>Keren banget 🔥</Text>
      </View>

      <View style={styles.commentCard}>
        <Text style={styles.commentUser}>budi</Text>
        <Text>Semangat belajar!</Text>
      </View>

      <TextInput placeholder="Write a comment..." style={styles.input} />

      <TouchableOpacity style={styles.button}>
        <Text style={styles.buttonText}>Send</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}
