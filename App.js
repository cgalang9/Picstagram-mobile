import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp, getApps } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import LogIn from "./components/auth/Login";
// import { Entypo } from "@expo/vector-icons";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

import {
  API_KEY,
  AUTH_DOMAIN,
  PROJECT_ID,
  STORAGE_BUCKET,
  MESSAGING_SENDER_ID,
  APP_ID,
  MEASUREMENT_ID,
} from "@env";

const firebaseConfig = {
  apiKey: API_KEY,
  authDomain: AUTH_DOMAIN,
  projectId: PROJECT_ID,
  storageBucket: STORAGE_BUCKET,
  messagingSenderId: MESSAGING_SENDER_ID,
  appId: APP_ID,
  measurementId: MEASUREMENT_ID,
};

if (getApps().length < 1) {
  const app = initializeApp(firebaseConfig);
}

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    alignItems: "center",
    marginTop: 100,
  },
});

const Stack = createNativeStackNavigator();
export default function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      const uid = user.uid;
      console.log(user);
      setIsLoaded(true);
      setIsLoggedIn(true);
    } else {
      setIsLoaded(true);
      setIsLoggedIn(false);
    }
  });

  if (!isLoaded) {
    return (
      <View style={styles.wrapper}>
        <Text>Loading...</Text>
      </View>
    );
  }

  if (!isLoggedIn) {
    return (
      <NavigationContainer>
        <Stack.Navigator initialRoute="Landing">
          <Stack.Screen
            name="Landing"
            component={Landing}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Register"
            component={Register}
            // options={({ navigation }) => ({
            //   headerLeft: null,
            //   headerRight: () => (
            //     <TouchableOpacity onPress={() => navigation.pop()}>
            //       <Entypo
            //         name="cross"
            //         color="blue"
            //         size={30}
            //         style={{ paddingHorizontal: 10 }}
            //       />
            //     </TouchableOpacity>
            //   ),
            // })}
          />
          <Stack.Screen
            name="Log In"
            component={LogIn}
            // options={({ navigation }) => ({
            //   headerLeft: null,
            //   headerLeft: () => (
            //     <TouchableOpacity onPress={() => navigation.pop()}>
            //       <Entypo
            //         name="cross"
            //         color="blue"
            //         size={30}
            //         style={{ paddingHorizontal: 10 }}
            //       />
            //     </TouchableOpacity>
            //   ),
            // })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <View style={styles.wrapper}>
      <Text>User Logged In</Text>
    </View>
  );
}
