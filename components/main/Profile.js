import React from "react";
import { View, Text, Image, FlatList, StyleSheet } from "react-native";
import { useSelector } from "react-redux";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  infoContainer: {
    margin: 20,
    flexDirection: "row",
  },
  infoContainerName: {
    flex: 1,
  },
  infoContainerCol: {
    paddingHorizontal: 5,
    flex: 1,
    alignItems: "center",
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
  text: {
    color: "white",
  },
});

export default function Profile() {
  const userPosts = useSelector((state) => state.userPosts);
  const user = useSelector((state) => state.user.currUser);
  return (
    <View style={styles.container}>
      <View style={styles.infoContainer}>
        <View style={styles.infoContainerName}>
          <Text style={styles.text}>{user.name}</Text>
          <Text style={styles.text}>{user.email}</Text>
        </View>
        <View style={styles.infoContainerCol}>
          <Text style={styles.text}>{userPosts.length}</Text>
          <Text style={styles.text}>Posts</Text>
        </View>
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
