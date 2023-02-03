import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  StyleSheet,
  Button,
  TextInput,
  Keyboard,
  Dimensions,
} from "react-native";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  query,
} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { db } from "../../App";

import { addCommentThunk } from "../../store/comments";
import { getCommentsThunk } from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    backgroundColor: "black",
    color: "white",
  },
  text: {
    color: "white",
  },
  textInput: {
    borderWidth: 1,
    borderStyle: "solid",
    borderColor: "white",
    borderRadius: 15,
    padding: 10,
    color: "white",
  },
  comment: {
    flex: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    fontSize: 20,
    padding: 10,
  },
  commentName: {
    color: "white",
    paddingRight: 10,
    fontSize: 20,
  },
  commentText: {
    color: "white",
    fontSize: 20,
  },
  inputContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "flex-end",
    backgroundColor: "black",
    color: "white",
  },
});

function Comments({ route, navigation }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const [text, setText] = useState([]);

  const commentsArr = useSelector((state) => state.comments);
  const currUser = useSelector((state) => state.user.currUser);
  console.log(currUser);

  useEffect(() => {
    // if (route.params.postId !== postId) {
    // }
    setComments(commentsArr);
  }, [commentsArr]);

  useEffect(() => {
    dispatch(getCommentsThunk(route.params.postedBy.uid, route.params.postId));
  }, []);

  useEffect(() => {
    const listenerShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const screenHeight = Dimensions.get("window").height;
      const endY = e.endCoordinates.screenY;
      setKeyboardSpace(screenHeight - endY + 10);
    });
    const listenerHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardSpace(0);
    });
    return () => {
      listenerHide.remove();
      listenerShow.remove();
    };
  }, []);

  return (
    <View style={styles.wrapper}>
      <FlatList
        numColumns={1}
        horizontal={false}
        data={comments}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Text style={styles.commentName}>{item.postedBy.name}</Text>
            <Text style={styles.commentText}>{item.text}</Text>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a comment..."
          onChangeText={(text) => setText(text)}
          style={styles.textInput}
          placeholderTextColor="white"
        />
        <Button
          title="Post"
          onPress={() => {
            dispatch(
              addCommentThunk(
                route.params.postedBy.uid,
                route.params.postId,
                text,
                currUser
              )
            );
          }}
        />
      </View>
      <View
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          height: keyboardSpace,
          backgroundColor: "white",
        }}
      ></View>
    </View>
  );
}

export default Comments;
