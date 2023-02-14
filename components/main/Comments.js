import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TextInput,
  Keyboard,
  Dimensions,
  TouchableOpacity,
} from "react-native";

import { addCommentThunk } from "../../store/comments";
import { getCommentsThunk } from "../../store/comments";
import { useDispatch, useSelector } from "react-redux";
import { wrapper, styles } from "../utils/styles";

function Comments({ route, navigation }) {
  const dispatch = useDispatch();
  const [comments, setComments] = useState([]);
  const [keyboardSpace, setKeyboardSpace] = useState(0);
  const [text, setText] = useState([]);
  const [listRef, setListRef] = useState(null);

  const commentsArr = useSelector((state) => state.comments);
  const currUser = useSelector((state) => state.user.currUser);

  useEffect(() => {
    let posterComment = {
      postedBy: route.params.postedBy,
      text: route.params.text,
    };
    setComments([posterComment, ...commentsArr]);
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
    <View style={wrapper.comments}>
      <FlatList
        ref={(ref) => setListRef(ref)}
        numColumns={1}
        horizontal={false}
        data={comments}
        style={{
          height: 300 - keyboardSpace,
        }}
        renderItem={({ item }) => (
          <View style={styles.comment}>
            <Image
              source={{
                uri:
                  item.postedBy.pic ||
                  "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
              }}
              style={styles.userIconComment}
            />
            <View>
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate("Profile", {
                    uid: item.postedBy.uid,
                    name: item.postedBy.name,
                    email: item.postedBy.email,
                    pic: item.postedBy.pic,
                  })
                }
              >
                <Text style={styles.commentName}>{item.postedBy.name}</Text>
              </TouchableOpacity>
              <Text style={styles.commentText}>{item.text}</Text>
            </View>
          </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Add a comment..."
          onChangeText={(text) => setText(text)}
          style={styles.textInput}
          placeholderTextColor="white"
          value={text}
        />
        <TouchableOpacity
          onPress={async () => {
            dispatch(
              addCommentThunk(
                route.params.postedBy.uid,
                route.params.postId,
                text,
                currUser
              )
            ).then(() => {
              setText("");
              listRef.scrollToEnd();
            });
          }}
          style={styles.postCommentBtn}
        >
          <Text style={[styles.textWhite, { fontSize: 18 }]}>Post</Text>
        </TouchableOpacity>
      </View>
      <View
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          height: keyboardSpace - 40,
          backgroundColor: "white",
        }}
      ></View>
    </View>
  );
}

export default Comments;
