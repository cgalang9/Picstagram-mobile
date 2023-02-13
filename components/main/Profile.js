import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
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
import { logOutThunk } from "../../store/user";
import { getUserPostsThunk } from "../../store/userPosts";
import { styles } from "../utils/styles";
import * as ImagePicker from "expo-image-picker";
import { changePicThunk } from "../../store/user";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../App";

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
      dispatch(getUserPostsThunk());
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
    dispatch(getUserFollowingThunk(route.params.uid));
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

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result) => {
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        uplaodImage(imageUri);
      }
    });
  };

  const uplaodImage = async (imageUri) => {
    const res = await fetch(imageUri);
    const blob = await res.blob();
    const storageRef = ref(
      storage,
      `posts/${user.uid}/${Math.random().toString(36)}`
    );

    const uploadTask = uploadBytesResumable(storageRef, blob);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        // Observe state change events such as progress, pause, and resume
        // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        console.log("Upload is " + progress + "% done");
        switch (snapshot.state) {
          case "paused":
            console.log("Upload is paused");
            break;
          case "running":
            console.log("Upload is running");
            break;
        }
      },
      (error) => {
        // Handle unsuccessful uploads
        console.log(error);
      },
      () => {
        // Handle successful uploads on complete
        // For instance, get the download URL: https://firebasestorage.googleapis.com/...
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          console.log("File available at", downloadURL);
          dispatch(changePicThunk(downloadURL));
        });
      }
    );
  };

  if (!user) {
    return <View></View>;
  }

  console.log(user.pic);
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerName}>
          <View>
            {user && (
              <Image
                source={{
                  uri:
                    user.pic ||
                    "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                }}
                style={styles.profileUserIcon}
              />
            )}
          </View>
          <Text style={styles.infoName}>{user.name}</Text>
        </View>
        <View style={styles.infoContainerCol}>
          <Text style={[styles.infoContainerColText, { fontWeight: "bold" }]}>
            {userPosts.length}
          </Text>
          <Text style={styles.infoContainerColText}>Posts</Text>
        </View>
        <View style={styles.infoContainerCol}>
          <Text style={[styles.infoContainerColText, { fontWeight: "bold" }]}>
            {followingArr.length}
          </Text>
          <Text style={styles.infoContainerColText}>Following</Text>
        </View>
      </View>

      {route.params.uid !== currUser.uid ? (
        <View>
          {following ? (
            <TouchableOpacity
              style={styles.followBtn}
              onPress={() => onUnfollow()}
            >
              <Text style={{ fontSize: 15, color: "white" }}>Following</Text>
            </TouchableOpacity>
          ) : (
            <TouchableOpacity
              style={styles.followBtn}
              onPress={() => onFollow()}
            >
              <Text style={{ fontSize: 15, color: "white" }}>Follow</Text>
            </TouchableOpacity>
          )}
        </View>
      ) : (
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <TouchableOpacity
            style={styles.followBtn}
            onPress={() => dispatch(logOutThunk())}
          >
            <Text style={{ fontSize: 15, color: "white" }}>Sign out</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.followBtn} onPress={pickImage}>
            <Text style={{ fontSize: 15, color: "white" }}>
              Edit Profile Picture
            </Text>
          </TouchableOpacity>
        </View>
      )}
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
    </SafeAreaView>
  );
}
