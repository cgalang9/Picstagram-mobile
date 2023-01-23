import React, { useEffect } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../store/user";
import { getUserPostsThunk } from "../store/userPosts";
// import { getAuth, signOut } from "firebase/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Foundation from "react-native-vector-icons/Foundation";
import Feed from "./main/Feed";
import Search from "./main/Search";
import Add from "./main/Add";
import Profile from "./main/Profile";

import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
const Tab = createBottomTabNavigator();

const Empty = () => {
  return null;
};

export default function Main({ navigation }) {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.currUser);
  useEffect(() => {
    const getCurrUser = async () => {
      dispatch(getUserThunk());
    };
    dispatch(getUserPostsThunk());
    getCurrUser();
  }, []);

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
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: "black" },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={32} />
          ),
        }}
      />
      <Tab.Screen
        name="NavAdd"
        component={Empty}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="plus-box" color={color} size={32} />
          ),
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Add");
          },
        })}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="account-circle"
              color={color}
              size={32}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
