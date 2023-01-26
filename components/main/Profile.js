import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { db } from "../../App";
import {
  collection,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  deleteDoc,
} from "firebase/firestore";

import { getUserFollowingThunk } from "../../store/following";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  infoContainer: {
    margin: 20,
    flexDirection: "row",
  },
  infoContainerName: {
    flex: 1,
  },
  infoContainerCol: {
    paddingHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  galleryContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
  text: {
    color: "white",
  },
  followBtn: {
    backgroundColor: "#1DA1F2",
    padding: 3,
    borderRadius: 5,
    marginTop: 10,
  },
});

export default function Profile({ route, navigation }) {
  const dispatch = useDispatch();
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const [following, setFollowing] = useState(false);
  const currUserPosts = useSelector((state) => state.userPosts);
  const currUser = useSelector((state) => state.user.currUser);
  const followingArr = useSelector((state) => state.following);

  useEffect(() => {
    if (route.params.uid === currUser.uid) {
      setUserPosts(currUserPosts);
      setUser(currUser);
    } else {
      const auth = getAuth();
      const currUserAuth = auth.currentUser;
      if (!currUserAuth) return console.log(" No user is signed in");

      const docRef = collection(db, "posts/" + route.params.uid + "/userPosts");
      const q = query(docRef, orderBy("created", "desc"));
      const getPosts = async () => {
        const querySnapshot = await getDocs(q);
        let posts = [];
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          posts.push({ ...doc.data(), id: doc.id });
        });
        setUserPosts(posts);
        setUser(route.params);
      };
      getPosts();
    }
  }, [route]);

  useEffect(() => {
    dispatch(getUserFollowingThunk());
  }, [route]);

  useEffect(() => {
    if (followingArr.includes(route.params.uid)) {
      setFollowing(true);
    } else {
      setFollowing(false);
    }
  }, [followingArr]);

  const onFollow = () => {
    const auth = getAuth();
    const currUserAuth = auth.currentUser;
    if (!currUserAuth) return console.log(" No user is signed in");

    const docRef = doc(
      db,
      "following/" + currUser.uid + "/userFollowing/",
      route.params.uid
    );
    const res = setDoc(docRef, {});
    setFollowing(true);
  };

  const onUnfollow = () => {
    const auth = getAuth();
    const currUserAuth = auth.currentUser;
    if (!currUserAuth) return console.log(" No user is signed in");

    const docRef = doc(
      db,
      "following/" + currUser.uid + "/userFollowing/",
      route.params.uid
    );
    const res = deleteDoc(docRef, {});
    setFollowing(false);
  };

  if (!user) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerName}>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text}>{user.email}</Text>
          {route.params.uid !== currUser.uid && (
            <View style={styles.followBtn}>
              {following ? (
                <Button
                  color="white"
                  title="Following"
                  onPress={() => onUnfollow()}
                />
              ) : (
                <Button
                  color="white"
                  title="Follow"
                  onPress={() => onFollow()}
                />
              )}
            </View>
          )}
        </View>
        <View style={styles.infoContainerCol}>
          <Text style={styles.text}>{userPosts.length}</Text>
          <Text style={styles.text}>Posts</Text>
        </View>
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerImage}>
                <Image
                  source={{ uri: item.downloadURL }}
                  style={styles.image}
                />
              </View>
            );
          }}
          keyExtractor={(item) => {
            item.id.toString();
          }}
        />
      </View>
    </View>
  );
}
