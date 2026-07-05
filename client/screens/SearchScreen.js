import { useContext, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Image,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { AuthContext } from "../context/AuthContext";

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

const GET_PROFILE = gql`
  query GetUserById($id: ID) {
    getUserById(_id: $id) {
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
  const { profileID } = useContext(AuthContext);

  const [keyword, setKeyword] = useState("");

  const { loading, error, data } = useQuery(SEARCH_USER, {
    variables: {
      name: keyword,
    },
    skip: keyword.trim() === "",
  });

  const { data: myProfileData } = useQuery(GET_PROFILE, {
    variables: {
      id: profileID,
    },
    skip: !profileID,
  });

  const myFollowing = myProfileData?.getUserById?.following || [];

  const searchResult = data?.searchUser || [];

  function handleCancel() {
    setKeyword("");
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* search header */}

      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          paddingHorizontal: 20,
          paddingTop: 15,
          paddingBottom: 12,
          borderBottomWidth: keyword ? 1 : 0,
          borderBottomColor: "#EFF3F4",
        }}
      >
        <View
          style={{
            flex: 1,
            height: 46,
            borderRadius: 25,
            backgroundColor: "#EFF3F4",
            flexDirection: "row",
            alignItems: "center",
            paddingHorizontal: 16,
          }}
        >
          <Ionicons name="search" size={20} color="#536471" />

          <TextInput
            style={{
              flex: 1,
              marginLeft: 8,
              fontSize: 17,
              color: "#0F1419",
              paddingVertical: 0,
            }}
            placeholder="Search"
            placeholderTextColor="#536471"
            value={keyword}
            onChangeText={setKeyword}
            autoCapitalize="none"
            autoCorrect={false}
          />

          {keyword.length > 0 && (
            <TouchableOpacity onPress={() => setKeyword("")}>
              <Ionicons name="close-circle" size={20} color="#536471" />
            </TouchableOpacity>
          )}
        </View>

        <TouchableOpacity
          onPress={handleCancel}
          style={{
            marginLeft: 18,
          }}
        >
          <Text
            style={{
              fontSize: 17,
              color: "#0F1419",
            }}
          >
            Cancel
          </Text>
        </TouchableOpacity>
      </View>

      {/* keyword kosong */}

      {keyword.trim() === "" ? (
        <View
          style={{
            paddingLeft: 38,
            paddingTop: 12,
          }}
        >
          <Text
            style={{
              fontSize: 14,
              color: "#536471",
            }}
          >
            Try searching for people by name or username
          </Text>
        </View>
      ) : loading ? (
        <View
          style={{
            paddingTop: 30,
            alignItems: "center",
          }}
        >
          <ActivityIndicator size="large" />
        </View>
      ) : (
        <FlatList
          data={searchResult}
          keyExtractor={(item) => item._id}
          keyboardShouldPersistTaps="handled"
          contentContainerStyle={{
            paddingTop: 8,
            paddingBottom: 100,
          }}
          ListEmptyComponent={
            <View
              style={{
                alignItems: "center",
                paddingTop: 50,
                paddingHorizontal: 30,
              }}
            >
              <Text
                style={{
                  fontSize: 20,
                  fontWeight: "700",
                  color: "#0F1419",
                }}
              >
                No results
              </Text>

              <Text
                style={{
                  fontSize: 15,
                  color: "#536471",
                  marginTop: 5,
                  textAlign: "center",
                }}
              >
                Try searching for another name or username
              </Text>
            </View>
          }
          renderItem={({ item }) => {
            const isFollowing = myFollowing.some(
              (user) => user._id === item._id,
            );

            const isMe = item._id === profileID;

            return (
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("UserProfile", {
                    _id: item._id,
                  });
                }}
                style={{
                  flexDirection: "row",
                  alignItems: "flex-start",
                  paddingHorizontal: 16,
                  paddingVertical: 12,
                }}
              >
                <Image
                  source={{
                    uri: "https://i.pravatar.cc/150",
                  }}
                  style={{
                    width: 52,
                    height: 52,
                    borderRadius: 26,
                  }}
                />

                <View
                  style={{
                    flex: 1,
                    marginLeft: 12,
                    minWidth: 0,
                  }}
                >
                  <Text
                    style={{
                      fontSize: 17,
                      fontWeight: "700",
                      color: "#0F1419",
                    }}
                    numberOfLines={1}
                  >
                    {item.name}
                  </Text>

                  <Text
                    style={{
                      fontSize: 16,
                      color: "#536471",
                      marginTop: 1,
                    }}
                    numberOfLines={1}
                  >
                    @{item.username}
                  </Text>

                  {isFollowing && (
                    <View
                      style={{
                        flexDirection: "row",
                        alignItems: "center",
                        marginTop: 3,
                      }}
                    >
                      <Ionicons name="person" size={15} color="#536471" />

                      <Text
                        style={{
                          fontSize: 15,
                          color: "#536471",
                          marginLeft: 5,
                        }}
                      >
                        Following
                      </Text>
                    </View>
                  )}
                </View>

                {!isMe && (
                  <View
                    style={{
                      paddingHorizontal: 16,
                      paddingVertical: 7,
                      borderRadius: 20,
                      backgroundColor: isFollowing ? "#fff" : "#0F1419",
                      borderWidth: isFollowing ? 1 : 0,
                      borderColor: "#CFD9DE",
                      marginLeft: 10,
                    }}
                  >
                    <Text
                      style={{
                        fontSize: 14,
                        fontWeight: "700",
                        color: isFollowing ? "#0F1419" : "#fff",
                      }}
                    >
                      {isFollowing ? "Following" : "Follow"}
                    </Text>
                  </View>
                )}
              </TouchableOpacity>
            );
          }}
        />
      )}
    </View>
  );
}
