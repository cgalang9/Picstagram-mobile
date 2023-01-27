import { async } from "@firebase/util";
import React, { useEffect } from "react";
import { View, Text } from "react-native";
// import { useDispatch, useSelector } from "react-redux";
// import { getFeedPostsThunk } from "../../store/feedPosts";
// import { getUserFollowingThunk } from "../../store/following";

export default function Feed() {
  // const followingArr = useSelector((state) => state.following);
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUserFollowingThunk());
  // }, []);

  // useEffect(() => {
  //   if (followingArr.length > 0) dispatch(getFeedPostsThunk(followingArr));
  // }, [followingArr]);
  return (
    <View>
      <Text>Feed</Text>
    </View>
  );
}
