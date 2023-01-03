import React, { useState } from "react";
import { Button, TextInput, StyleSheet } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
  input: {
    fontSize: 26,
    padding: 5,
    width: "60%",
    borderWidth: 1,
    borderColor: "black",
    marginBottom: 25,
  },
});

export default function LogIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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
        console.log(errorCode);
        console.log(errorMessage);
      });
  };

  return (
    <SafeAreaView style={styles.wrapper}>
      <TextInput
        placeholder="Email"
        onChangeText={(email) => setEmail(email)}
        style={styles.input}
      />
      <TextInput
        placeholder="Password"
        onChangeText={(password) => setPassword(password)}
        secureTextEntry={true}
        style={styles.input}
      />
      <Button title="Sign In" onPress={onSignIn} />
    </SafeAreaView>
  );
}
