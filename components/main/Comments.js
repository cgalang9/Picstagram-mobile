import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
} from "react-native";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../App";

function Comments({ route, navigation }) {
  const [comments, setComments] = useState([]);
  const [postId, setPostId] = useState([]);
  const [text, setText] = useState([]);

  //   useEffect(() => {
  //     if (route.params.postId !== postId) {
  //     }
  //   }, [route.params.postId]);

  const fetchPosts = () => {};

  const addComment = () => {
    const auth = getAuth();
    const currUserAuth = auth.currentUser;
    if (!currUserAuth) return console.log(" No user is signed in");

    addDoc(
      collection(
        db,
        "posts",
        route.params.postedBy.uid,
        "userPosts",
        route.params.postId,
        "comments"
      ),
      {
        text: text,
        created: serverTimestamp(),
        postedBy: currUserAuth.uid,
      }
    ).then(() => {
      setText("");
    });
  };

  return (
    <View>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        render={({ item }) => (
          <View>
            <Text>Text</Text>
          </View>
        )}
      />
      <View>
        <TextInput
          placeholder="Add a comment..."
          onChangeText={(text) => setText(text)}
        />
        <Button
          title="Send"
          onPress={() => {
            addComment();
          }}
        />
      </View>
    </View>
  );
}

export default Comments;
