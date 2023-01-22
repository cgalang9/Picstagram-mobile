import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: 40,
  },
  infoContainer: {
    margin: 20,
  },
  galleryContainer: {
    flex: 1,
  },
  image: {
    flex: 1,
    aspectRatio: 1 / 1,
  },
  containerImage: {
    flex: 1 / 3,
  },
});

export default function Profile() {
  const userPosts = useSelector((state) => state.userPosts);
  const user = useSelector((state) => state.user.currUser);
  console.log(userPosts);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <Text>{user.name}</Text>
        <Text>{user.email}</Text>
      </View>
      <View style={styles.galleryContainer}>
        <FlatList
          numColumns={3}
          horizontal={false}
          data={userPosts}
          renderItem={({ item }) => {
            return (
              <View style={styles.containerImage}>
                <Image
                  source={{ uri: item.downloadURL }}
                  style={styles.image}
                />
              </View>
            );
          }}
          keyExtractor={(item) => {
            item.id.toString();
          }}
        />
      </View>
    </View>
  );
}
