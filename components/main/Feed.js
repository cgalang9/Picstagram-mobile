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
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getFeedPostsThunk } from "../../store/feedPosts";
import { getUserFollowingThunk } from "../../store/following";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
  },
  postContianer: {
    width: Dimensions.get("window").width,
    marginBottom: 10,
  },
  image: {
    aspectRatio: 1 / 1,
  },
  postHead: {
    backgroundColor: "black",
    color: "white",
    padding: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
});

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
  return (
    <View style={styles.wrapper}>
      <View style={styles.wrapper}>
        <FlatList
          numColumns={1}
          horizontal={false}
          data={posts}
          renderItem={({ item }) => (
            <View style={styles.postContianer}>
              <Text style={styles.postHead}>{item.postedBy.name}</Text>
              <Image source={{ uri: item.downloadURL }} style={styles.image} />
              <TouchableOpacity
                onPress={() => {
                  console.log("sssss");
                  navigation.navigate("Comments", {
                    postId: item.id,
                    postedBy: item.postedBy,
                  });
                }}
              >
                <Text style={styles.postHead}>View Comments...</Text>
              </TouchableOpacity>
            </View>
          )}
        />
      </View>
    </View>
  );
}
