import React, { useState } from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { wrapper, styles } from "../utils/styles";
import {
  useFonts,
  GrandHotel_400Regular,
} from "@expo-google-fonts/grand-hotel";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

export default function Landing({ navigation }) {
  const [error, setError] = useState(null);
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }

  const DemoLogIn = async () => {
    const auth = getAuth();
    signInWithEmailAndPassword(auth, "demo@aa.io", "password")
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
      })
      .catch((error) => {
        setError("Error Please Try Again");
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
      <TouchableOpacity
        onPress={() => navigation.navigate("Register")}
        style={styles.authBtn}
      >
        <Text style={[styles.textWhite, { fontSize: 18 }]}>Register</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => navigation.navigate("Log In")}
        style={styles.authBtn}
      >
        <Text style={[styles.textWhite, { fontSize: 18 }]}>Log{"  "}In</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={DemoLogIn} style={styles.authBtn}>
        <Text style={[styles.textWhite, { fontSize: 18 }]}>
          Log{"  "}In{"  "}As{"  "}Demo{"   "}User
        </Text>
      </TouchableOpacity>
      {error && <Text style={{ color: "red", fontSize: 18 }}>{error}</Text>}
    </SafeAreaView>
  );
}
