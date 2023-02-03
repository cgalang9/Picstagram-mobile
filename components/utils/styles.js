import { StyleSheet } from "react-native";

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
});

export { wrapper, styles };
