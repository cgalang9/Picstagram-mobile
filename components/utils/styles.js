import { StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const wrapper = StyleSheet.create({
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "black",
  },
});

const styles = StyleSheet.create({
  authBtn: {
    justifyContent: "center",
    backgroundColor: "#405DE6",
    paddingVertical: 12,
    marginVertical: 12,
    alignItems: "center",
    width: "80%",
    borderRadius: 5,
  },
  textWhite: {
    color: "white",
    fontFamily: "Farah",
  },
  inputAuth: {
    fontSize: 24,
    padding: 10,
    width: "80%",
    backgroundColor: "grey",
    color: "white",
    borderWidth: 1,
    borderColor: "grey",
    marginBottom: 25,
    borderRadius: 5,
  },
  feedHead: {
    width: Dimensions.get("window").width,
    paddingVertical: 10,
    paddingHorizontal: 15,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  postContianer: {
    width: Dimensions.get("window").width,
    marginBottom: 10,
  },
  postHeadContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  userIconPost: {
    aspectRatio: 1 / 1,
    height: 30,
    borderRadius: 20,
    backgroundColor: "white",
  },
  postImage: {
    aspectRatio: 1 / 1,
  },
  postHead: {
    backgroundColor: "black",
    color: "white",
    padding: 15,
    fontSize: 15,
    fontWeight: "bold",
  },
  searchInputContainer: {
    color: "white",
    padding: 10,
    borderRadius: 5,
    backgroundColor: "grey",
    width: "90%",
    flexDirection: "row",
    alignItems: "center",
    fontSize: 18,
    marginTop: 20,
  },
  searchInput: {
    fontSize: 16,
    paddingLeft: 8,
    width: "100%",
    color: "white",
  },
  searchItem: {
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
    justifySelf: "flex-start",
  },
  searchUserIcon: {
    aspectRatio: 1 / 1,
    borderRadius: 20,
    backgroundColor: "white",
    width: 40,
    marginLeft: 20,
  },
  container: {
    flex: 1,
    backgroundColor: "black",
  },
  infoContainer: {
    margin: 20,
    flexDirection: "row",
    alignItems: "center",
  },
  infoContainerName: {
    flex: 1,
  },
  infoContainerCol: {
    paddingHorizontal: 5,
    flex: 1,
    alignItems: "center",
  },
  infoContainerColText: {
    color: "white",
    fontSize: 16,
    fontFamily: "Arial",
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
  infoName: {
    color: "white",
    paddingVertical: 12,
    fontWeight: "bold",
    fontSize: 16,
  },
  followBtn: {
    backgroundColor: "#1DA1F2",
    borderRadius: 5,
    marginHorizontal: 15,
    marginBottom: 25,
    width: 150,
  },
  profileUserIcon: {
    aspectRatio: 1 / 1,
    borderRadius: 80,
    backgroundColor: "white",
    width: 80,
  },
});

export { wrapper, styles };
