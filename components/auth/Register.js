import React, { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard,
  Dimensions,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../App";
import { wrapper, styles } from "../utils/styles";
import {
  useFonts,
  GrandHotel_400Regular,
} from "@expo-google-fonts/grand-hotel";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState(null);
  const [keyboardSpace, setKeyboardSpace] = useState(0);

  useEffect(() => {
    const listenerShow = Keyboard.addListener("keyboardDidShow", (e) => {
      const screenHeight = Dimensions.get("window").height;
      const endY = e.endCoordinates.screenY;
      setKeyboardSpace(screenHeight - endY - 90);
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

  const onSignUp = async () => {
    const auth = getAuth();
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        console.log(user);
        try {
          const docRef = await setDoc(doc(db, "users", user.uid), {
            name,
            email,
          });
        } catch (e) {
          console.error("Error adding document: ", e);
        }
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError("Email already has an account");
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
        placeholder="Name"
        onChangeText={(name) => setName(name)}
        style={styles.inputAuth}
        placeholderTextColor={"white"}
      />
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
      <TouchableOpacity onPress={onSignUp} style={styles.authBtn}>
        <Text style={[styles.textWhite, { fontSize: 18 }]}>Sign Up</Text>
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
