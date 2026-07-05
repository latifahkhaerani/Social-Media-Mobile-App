import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import { Ionicons } from "@react-native-vector-icons/ionicons";
import { gql } from "@apollo/client";
import { useQuery } from "@apollo/client/react";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import UserList from "../components/UserList";

const GET_PROFILE = gql`
  query GetUserById($id: ID) {
    getUserById(_id: $id) {
      _id
      name
      username
      email
      follower {
        _id
        name
        username
        email
      }
      following {
        _id
        name
        username
        email
      }
    }
  }
`;

export default function FollowingList({ route, navigation }) {
  const { profileID } = useContext(AuthContext);

  // kalau ada id yang dikirim, pakai id itu
  const selectedUserId = route?.params?._id;

  // kalau tidak ada id, pakai id user login
  const userId = selectedUserId || profileID;

  const { loading, error, data } = useQuery(GET_PROFILE, {
    variables: {
      id: userId,
    },
    skip: !userId,
  });

  const { data: myProfileData } = useQuery(GET_PROFILE, {
    variables: {
      id: profileID,
    },
    skip: !profileID,
  });

  const myFollowing = myProfileData?.getUserById?.following || [];

  const user = data?.getUserById;

  const following = user?.following || [];

  if (loading && !data) {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ActivityIndicator size="large" />
      </View>
    );
  }

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: "#fff",
      }}
    >
      {/* header */}
      <View
        style={{
          height: 55,
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
          borderBottomWidth: 1,
          borderBottomColor: "#EFF3F4",
        }}
      >
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{
            position: "absolute",
            left: 20,
          }}
        >
          <Ionicons name="arrow-back" size={26} color="#0F1419" />
        </TouchableOpacity>

        <Text
          style={{
            fontSize: 20,
            fontWeight: "700",
          }}
        >
          @{user?.username}
        </Text>
      </View>

      {/* tabs */}
      <View
        style={{
          flexDirection: "row",
          borderBottomWidth: 1,
          borderBottomColor: "#EFF3F4",
        }}
      >
        {/* following */}
        <TouchableOpacity
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              fontWeight: "700",
            }}
          >
            Following
          </Text>

          <View
            style={{
              position: "absolute",
              bottom: 0,
              width: 100,
              height: 4,
              borderRadius: 10,
              backgroundColor: "#1D9BF0",
            }}
          />
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() =>
            navigation.replace("Followers", {
              _id: userId,
            })
          }
          style={{
            flex: 1,
            alignItems: "center",
            paddingVertical: 15,
          }}
        >
          <Text
            style={{
              fontSize: 16,
              color: "#536471",
            }}
          >
            Followers
          </Text>
        </TouchableOpacity>
      </View>

      {/* following list */}
      <UserList
        data={following}
        navigation={navigation}
        myFollowing={myFollowing}
      />
    </View>
  );
}
