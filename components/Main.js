import React, { useEffect } from "react";
// import { View, Text, Button, StyleSheet } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { getUserThunk } from "../store/user";
import { getUserPostsThunk } from "../store/userPosts";
// import { getAuth, signOut } from "firebase/auth";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import Foundation from "react-native-vector-icons/Foundation";
import Ionicons from "react-native-vector-icons/Ionicons";
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

  return (
    <Tab.Navigator
      initialRouteName="Feed"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarStyle: { backgroundColor: "black", borderTopWidth: 0 },
        tabBarShowLabel: false,
      }}
    >
      <Tab.Screen
        name="Feed"
        component={Feed}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Foundation name="home" color={color} size={32} />
          ),
          headerShown: false,
        }}
      />
      <Tab.Screen
        name="Search"
        component={Search}
        options={{
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="search" color={color} size={32} />
          ),
          headerShown: false,
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
          headerShown: false,
        }}
        listeners={({ navigation }) => ({
          tabPress: (e) => {
            e.preventDefault();
            navigation.navigate("Profile", { uid: user.uid });
          },
        })}
      />
    </Tab.Navigator>
  );
}
