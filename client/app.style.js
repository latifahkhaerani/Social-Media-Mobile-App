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
    fontSize: 20,
  },

  date: {
    color: "#888",
    fontSize: 14,
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
    paddingVertical: 18,
    paddingHorizontal: 0,
    borderBottomWidth: 1,
    borderBottomColor: "#EFF3F4",
    marginBottom: 0,
  },

  postHeader: {
    flexDirection: "row",
    alignItems: "start",
    // marginBottom: 10,
  },

  avatar: {
    width: 40,
    height: 40,
    borderRadius: 24,
    marginRight: 12,
  },

  username: {
    fontWeight: "700",
    fontSize: 16,
    color: "#0F1419",
  },

  postContent: {
    fontSize: 17,
    color: "#0F1419",
    lineHeight: 24,
    marginBottom: 12,
  },

  image: {
    width: "100%",
    height: 240,
    borderRadius: 16,
    marginBottom: 12,
  },

  postFooter: {
    flexDirection: "row",
    justifyContent: "start",
    alignItems: "center",
    marginLeft: 50,
    gap: 40,
    marginTop: 5,
    paddingVertical: 5,
  },

  addpostFooter: {
    flexDirection: "row",
    // justifyContent: "start",
    alignItems: "center",
    marginLeft: 25,
    gap: 40,
    borderTop: 5,
    borderColor: "black",
    // paddingVertical: 5,
    fontSize: "bold",
  },

  profileHeader: {
    flexDirection: "row",
    marginBottom: 0,
    backgroundColor: "#fff",
    gap: 20,
  },

  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: "#fff",
    marginBottom: 18,
  },

  profileName: {
    fontSize: 28,
    fontWeight: "800",
    color: "#0F1419",
  },

  profileUsername: {
    fontSize: 16,
    color: "#536471",
    marginTop: 2,
  },

  profileInfo: {
    flexDirection: "row",
    justifyContent: "flex-start",
    width: "100%",
    marginTop: 22,
    marginBottom: 22,
  },

  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginRight: 22,
  },

  infoNumber: {
    fontSize: 16,
    fontWeight: "700",
    color: "#0F1419",
    marginRight: 5,
  },

  sectionTitle: {
    alignSelf: "flex-start",
    fontSize: 17,
    fontWeight: "700",
    color: "#0F1419",
    paddingVertical: 16,
    paddingHorizontal: 15,
    borderBottomWidth: 4,
    borderBottomColor: "#1D9BF0",
    marginBottom: 0,
  },

  logoutButton: {
    borderWidth: 1,
    borderColor: "#CFD9DE",
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    alignItems: "center",
    alignSelf: "flex-end",
    marginTop: 15,
    marginBottom: 10,
  },

  logoutText: {
    color: "#0F1419",
    fontSize: 15,
    fontWeight: "700",
  },
});

module.exports = styles;
