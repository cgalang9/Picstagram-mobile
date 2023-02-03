import React from "react";
import { Text, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { wrapper, styles } from "../utils/styles";
import {
  useFonts,
  GrandHotel_400Regular,
} from "@expo-google-fonts/grand-hotel";

export default function Landing({ navigation }) {
  let [fontsLoaded] = useFonts({
    GrandHotel_400Regular,
  });

  if (!fontsLoaded) {
    return null;
  }
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
        <Text style={[styles.textWhite, { fontSize: 18 }]}>Log In</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}
