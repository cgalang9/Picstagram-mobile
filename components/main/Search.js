import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  Dimensions,
  Image,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../App";
import { wrapper, styles } from "../utils/styles";
import { Feather } from "@expo/vector-icons";

export default function Search({ navigation }) {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (search) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", ">=", search));
    const querySnapshot = await getDocs(q);
    let usersTemp = [];
    querySnapshot.forEach((doc) => {
      usersTemp.push({ ...doc.data(), id: doc.id });
    });
    setUsers(usersTemp);
  };

  return (
    <SafeAreaView style={wrapper.wrapper}>
      <View style={styles.searchInputContainer}>
        <Feather name="search" color="white" size={18} />
        <TextInput
          placeholder="Search"
          onChangeText={(search) => fetchUsers(search)}
          style={styles.searchInput}
          placeholderTextColor={"white"}
        />
      </View>
      <FlatList
        data={users}
        numColumns={1}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              horizontal={false}
              style={styles.searchItem}
              onPress={() =>
                navigation.navigate("Profile", {
                  uid: item.id,
                  name: item.name,
                  email: item.email,
                })
              }
            >
              <Image
                source={{
                  uri: "https://upload.wikimedia.org/wikipedia/commons/9/99/Sample_User_Icon.png",
                }}
                style={styles.searchUserIcon}
              />
              <Text
                style={[
                  styles.postHead,
                  { width: Dimensions.get("window").width * 0.7 },
                ]}
              >
                {item.name}
              </Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => {
          item.id.toString();
        }}
      />
    </SafeAreaView>
  );
}
