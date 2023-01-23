import React, { useEffect, useState } from "react";
import { View, Text, TextInput, FlatList } from "react-native";
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from "../../App";

export default function Search() {
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
    <View>
      <TextInput onChange={(search) => fetchUsers(search)} />
    </View>
  );
}
