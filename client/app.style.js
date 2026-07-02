const { StyleSheet } = require("react-native");

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F8F9FA",
    justifyContent: "center",
    paddingHorizontal: 25,
  },

  logo: {
    fontSize: 34,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 10,
  },

  subtitle: {
    textAlign: "center",
    color: "#666",
    marginBottom: 40,
    fontSize: 16,
  },

  card: {
    backgroundColor: "#fff",
    borderRadius: 20,
    padding: 25,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    elevation: 5,
  },

  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 12,
    padding: 15,
    marginBottom: 18,
    fontSize: 16,
  },

  button: {
    backgroundColor: "#0095F6",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginTop: 5,
  },

  buttonText: {
    color: "white",
    fontWeight: "bold",
    fontSize: 16,
  },

  register: {
    textAlign: "center",
    marginTop: 20,
    color: "#666",
  },

  link: {
    color: "#0095F6",
    fontWeight: "bold",
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    marginTop: 40,
    marginBottom: 25,
    textAlign: "center",
  },

  textArea: {
    height: 150,
    textAlignVertical: "top",
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 15,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },

  username: {
    fontWeight: "bold",
    fontSize: 17,
  },

  date: {
    color: "#888",
    fontSize: 13,
    marginTop: 2,
  },

  content: {
    fontSize: 16,
    marginBottom: 15,
    lineHeight: 22,
  },
  image: {
    width: "100%",
    height: 220,
    borderRadius: 12,
    marginBottom: 15,
  },

  info: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  like: {
    fontWeight: "600",
  },

  comment: {
    fontWeight: "600",
  },

  commentTitle: {
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 15,
  },

  commentCard: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 12,
    marginBottom: 12,
  },

  commentUser: {
    fontWeight: "bold",
    marginBottom: 5,
  },

  postCard: {
    backgroundColor: "#fff",
    borderRadius: 15,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,

    postContent: {
      fontSize: 15,
      marginBottom: 12,
    },

    postImage: {
      width: "100%",
      height: 220,
      borderRadius: 12,
    },

    postFooter: {
      flexDirection: "row",
      justifyContent: "space-between",
      marginTop: 12,
    },

    userCard: {
      flexDirection: "row",
      alignItems: "center",
      backgroundColor: "#fff",
      padding: 15,
      borderRadius: 15,
      marginBottom: 12,
    },

    userUsername: {
      color: "#777",
      marginTop: 3,
    },

    followButton: {
      backgroundColor: "#0095F6",
      paddingHorizontal: 18,
      paddingVertical: 10,
      borderRadius: 20,
    },

    followText: {
      color: "white",
      fontWeight: "bold",
    },
    profileHeader: {
      alignItems: "center",
      marginBottom: 25,
    },

    profileImage: {
      width: 120,
      height: 120,
      borderRadius: 60,
      marginBottom: 15,
    },

    profileName: {
      fontSize: 28,
      fontWeight: "bold",
    },

    profileUsername: {
      fontSize: 16,
      color: "#666",
      marginTop: 5,
    },

    bio: {
      textAlign: "center",
      color: "#666",
      marginTop: 10,
      lineHeight: 22,
    },

    profileInfo: {
      flexDirection: "row",
      justifyContent: "space-around",
      width: "100%",
      marginVertical: 25,
    },

    infoItem: {
      alignItems: "center",
    },

    infoNumber: {
      fontSize: 22,
      fontWeight: "bold",
    },

    sectionTitle: {
      alignSelf: "flex-start",
      fontSize: 22,
      fontWeight: "bold",
      marginBottom: 15,
    },
  },
});

module.exports = styles;
