import { StatusBar } from "expo-status-bar";
import { TouchableOpacity, View, StyleSheet, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// import { getAnalytics } from "firebase/analytics";
import Landing from "./components/auth/Landing";
import Register from "./components/auth/Register";
import LogIn from "./components/auth/Login";
import Main from "./components/Main";
import Add from "./components/main/Add";
import Save from "./components/main/Save";
import Comments from "./components/main/Comments";
import { useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getStorage } from "firebase/storage";

//For redux
import { Provider } from "react-redux";
import configureStore from "./store";
const store = configureStore();

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

export let storage = null;
export let db = null;
export let database = null;
if (getApps().length < 1) {
  const app = initializeApp(firebaseConfig);
  db = getFirestore(app);
  storage = getStorage(app);
  console.log(db);
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
      // console.log(user);
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
            options={({ navigation }) => ({
              headerTransparent: true,
              headerTintColor: "white",
              title: "",
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="Log In"
            component={LogIn}
            options={({ navigation }) => ({
              headerTransparent: true,
              headerTintColor: "white",
              title: "",
            })}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator initialRoute="Main">
          <Stack.Screen
            name="Main"
            component={Main}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Add"
            component={Add}
            options={({ navigation }) => ({
              headerTransparent: true,
              headerTintColor: "white",
              title: "",
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="Save"
            component={Save}
            options={({ navigation }) => ({
              headerTransparent: true,
              headerTintColor: "white",
              title: "",
              headerBackTitleVisible: false,
            })}
          />
          <Stack.Screen
            name="Comments"
            component={Comments}
            // options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
