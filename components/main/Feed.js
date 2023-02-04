import { async } from "@firebase/util";
import React, { useEffect } from "react";
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Image,
  Dimensions,
  TouchableOpacity,
  SafeAreaView,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPostsThunk } from "../../store/feedPosts";
import { getUserFollowingThunk } from "../../store/following";
import {
  useFonts,
  GrandHotel_400Regular,
} from "@expo-google-fonts/grand-hotel";
import { wrapper, styles } from "../utils/styles";
import { Feather } from "@expo/vector-icons";

export default function Feed({ navigation }) {
  const followingArr = useSelector((state) => state.following);
  const posts = useSelector((state) => state.feedPosts);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserFollowingThunk());
  }, []);

  useEffect(() => {
    if (followingArr.length > 0) dispatch(getFeedPostsThunk(followingArr));
  }, [followingArr]);

  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  return (
    <SafeAreaView style={wrapper.wrapper}>
      <View style={styles.feedHead}>
        <Text
          style={{
            fontFamily: "GrandHotel_400Regular",
            fontSize: 40,
            color: "white",
          }}
        >
          Picstagram
        </Text>
        <Feather
          name="plus-square"
          color="white"
          size={32}
          style={{ paddingVertical: 10, paddingHorizontal: 15 }}
          onPress={() => navigation.navigate("Add")}
        />
      </View>
      <View style={wrapper.wrapper}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.postContianer}>
              <View style={styles.postHeadContainer}>
                <Image
                  source={{
                    uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                  }}
                  style={styles.userIconPost}
                />
                <Text style={styles.postHead}>{item.postedBy.name}</Text>
              </View>
              <Image
                source={{ uri: item.downloadURL }}
                style={styles.postImage}
              />
              <View style={{ flexDirection: "row" }}>
                <Text
                  style={[
                    styles.postHead,
                    { paddingVertical: 10, paddingLeft: 15, paddingRight: 5 },
                  ]}
                >
                  {item.postedBy.name}
                </Text>
                <Text
                  style={[
                    styles.postHead,
                    {
                      paddingVertical: 10,
                      paddingHorizontal: 0,
                      fontWeight: "350",
                    },
                  ]}
                >
                  {item.caption}
                </Text>
              </View>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("Comments", {
                    postId: item.id,
                    postedBy: item.postedBy,
                  });
                }}
              >
                <Text
                  style={{ fontSize: 15, color: "grey", paddingHorizontal: 15 }}
                >
                  View all comments...
                </Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </SafeAreaView>
  );
}
