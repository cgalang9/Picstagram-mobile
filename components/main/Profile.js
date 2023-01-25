import React, { useEffect, useState } from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { getAuth } from "firebase/auth";
import { db } from "../../App";
import { collection, getDocs, query, orderBy } from "firebase/firestore";

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
});

export default function Profile({ route, navigation }) {
  const [userPosts, setUserPosts] = useState([]);
  const [user, setUser] = useState(null);
  const currUserPosts = useSelector((state) => state.userPosts);
  const currUser = useSelector((state) => state.user.currUser);

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

  if (!user) {
    return <View></View>;
  }

  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerName}>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text}>{user.email}</Text>
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
