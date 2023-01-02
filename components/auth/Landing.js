import React from "react";
import { Text, View, StyleSheet, Button } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
  },
});

export default function Landing({ navigation }) {
  return (
    <SafeAreaView style={styles.wrapper}>
      <Button
        title="Register"
        onPress={() => navigation.navigate("Register")}
      />
      <Button title="Log In" onPress={() => navigation.navigate("LogIn")} />
    </SafeAreaView>
  );
}
