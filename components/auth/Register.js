import React, { useState } from "react";
import { Text, View, Button, TextInput, TouchableOpacity } from "react-native";
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
        console.log(errorCode);
        console.log(errorMessage);
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
      {/* <Button title="Sign Up" onPress={onSignUp} /> */}
      <TouchableOpacity onPress={onSignUp} style={styles.authBtn}>
        <Text style={[styles.textWhite, { fontSize: 18 }]}>Sign Up</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
