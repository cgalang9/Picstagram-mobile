import React, { useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { collection, query, where } from "firebase/firestore";

export default function Search() {
  const [users, setUsers] = useState([]);

  const fetchUsers = async (search) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("name", ">=", search));
    const querySnapshot = await getDocs(q);
  };

  return (
    <View>
      <Text>Search</Text>
    </View>
  );
}
