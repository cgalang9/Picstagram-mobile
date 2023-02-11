import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Image,
  TouchableOpacity,
  Text,
  StyleSheet,
  Keyboard,
  Dimensions,
} from "react-native";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { storage, db } from "../../App";
import { useSelector } from "react-redux";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    aspectRatio: 2 / 3,
    flex: 1,
    alignItems: "center",
  },
  input: {
    marginHorizontal: 15,
    padding: 15,
    fontSize: 15,
    width: "70%",
    borderRadius: 5,
    backgroundColor: "lightgrey",
  },
  btnWrapper: {
    flexDirection: "row",
    alignItems: "center",
    position: "absolute",
    // bottom: 0,
    paddingVertical: 35,
    backgroundColor: "white",
    width: "100%",
  },
  authBtn: {
    justifyContent: "center",
    backgroundColor: "#405DE6",
    padding: 12,
    marginVertical: 12,
    alignItems: "center",
    borderRadius: 5,
  },
  textWhite: {
    color: "white",
    fontFamily: "Farah",
  },
});

export default function Save({ route, navigation }) {
  const { imageUri } = route.params;
  const [caption, setCaption] = useState("");
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const user = useSelector((state) => state.user.currUser);

  useEffect(() => {
    const listenerShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const screenHeight = Dimensions.get("window").height;
      const endY = e.endCoordinates.screenY;
      console.log(screenHeight, endY, "bbbb", screenHeight - endY - 100);
      setKeyboardSpace(screenHeight - endY);
    });
    const listenerHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardSpace(0);
    });
    return () => {
      listenerHide.remove();
      listenerShow.remove();
    };
  }, []);

  console.log(keyboardSpace);
  const uplaodImage = async () => {
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
          addDoc(collection(db, "posts", user.uid, "userPosts"), {
            downloadURL: downloadURL,
            caption: caption,
            created: serverTimestamp(),
            postedBy: user,
          }).then(() => {
            navigation.navigate("Feed");
          });
        });
      }
    );
  };

  return (
    <View style={styles.wrapper}>
      <Image
        source={{ uri: imageUri }}
        style={styles.image}
        resizeMode="cover"
      />
      <View style={[styles.btnWrapper, { bottom: keyboardSpace }]}>
        <TextInput
          style={styles.input}
          placeholder="Write a Caption..."
          onChangeText={(caption) => setCaption(caption)}
        />
        <TouchableOpacity onPress={() => uplaodImage()} style={styles.authBtn}>
          <Text style={[styles.textWhite, { fontSize: 18 }]}>Save</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
