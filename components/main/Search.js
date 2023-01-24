import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  FlatList,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../App";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  searchItem: {
    padding: 10,
  },
});

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
    <View style={styles.container}>
      <TextInput
        placeholder="Type Here"
        onChangeText={(search) => fetchUsers(search)}
      />
      <FlatList
        data={users}
        numColumns={1}
        horizontal={false}
        renderItem={({ item }) => {
          return (
            <TouchableOpacity
              style={styles.searchItem}
              onPress={() => navigation.navigate("Profile", { uid: item.id })}
            >
              <Text>{item.name}</Text>
            </TouchableOpacity>
          );
        }}
        keyExtractor={(item) => {
          item.id.toString();
        }}
      />
    </View>
  );
}
