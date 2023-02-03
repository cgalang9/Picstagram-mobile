import React, { useState, useEffect } from "react";
import {
  TouchableOpacity,
  TextInput,
  Text,
  Keyboard,
  View,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { wrapper, styles } from "../utils/styles";
import {
  useFonts,
  GrandHotel_400Regular,
} from "@expo-google-fonts/grand-hotel";

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    const listenerShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const screenHeight = Dimensions.get("window").height;
      const endY = e.endCoordinates.screenY;
      setKeyboardSpace(screenHeight - endY - 100);
    });
    const listenerHide = Keyboard.addListener("keyboardDidHide", () => {
      setKeyboardSpace(0);
    });
    return () => {
      listenerHide.remove();
      listenerShow.remove();
    };
  }, []);

  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const onSignIn = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Email and/or password incorrect");
      });
  };

  return (
    <SafeAreaView style={wrapper.wrapper}>
      <Text
        style={{
          fontFamily: "GrandHotel_400Regular",
          fontSize: 60,
          color: "white",
          marginBottom: 20,
        }}
      >
        Picstagram
      </Text>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        style={styles.inputAuth}
        placeholderTextColor={"white"}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={styles.inputAuth}
        placeholderTextColor={"white"}
      />
      <TouchableOpacity onPress={onSignIn} style={styles.authBtn}>
        <Text style={[styles.textWhite, { fontSize: 18 }]}>Sign In</Text>
      </TouchableOpacity>
      {error && <Text style={{ color: "red", fontSize: 18 }}>{error}</Text>}
      <View
        style={{
          left: 0,
          right: 0,
          bottom: 0,
          height: keyboardSpace,
          backgroundColor: "white",
        }}
      ></View>
    </SafeAreaView>
  );
}
