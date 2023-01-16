import React, { useState } from "react";
import { View, TextInput, Image, Button, StyleSheet } from "react-native";
// import { ref, uploadBytes } from "firebase/storage";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";
import { storage } from "../../App";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
});

export default function Save({ route, navigation }) {
  const { imageUri } = route.params;
  // console.log(imageUri);
  const [caption, setCaption] = useState("");
  const user = useSelector((state) => state.user.currUser);
  // console.log(user.uid);

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
        });
      }
    );
  };
  return (
    <View style={styles.wrapper}>
      <Image source={{ uri: imageUri }} />
      <TextInput
        placeholder="Write a Caption..."
        onChangeText={(caption) => setCaption(caption)}
      />
      <Button title="Save" onPress={() => uplaodImage()} />
    </View>
  );
}
