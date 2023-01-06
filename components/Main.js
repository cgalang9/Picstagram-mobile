import React, { useEffect } from "react";
import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../store/user";
// import { getAuth, signOut } from "firebase/auth";
const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
});

export default function Main() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currUser);
  useEffect(() => {
    const getCurrUser = async () => {
      dispatch(getUserThunk());
    };
    getCurrUser();
  }, []);
  console.log(user);
  // const signOut = async () => {
  //   const auth = getAuth();
  //   signOut(auth)
  //     .then(() => {
  //       // const user = userCredential.user;
  //       console.log(user);
  //     })
  //     .catch((error) => {
  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.log(errorCode);
  //       console.log(errorMessage);
  //     });
  // };
  return (
    <View style={styles.wrapper}>
      <Text>Test</Text>
    </View>
  );
}
