import { Camera, CameraType } from "expo-camera";
import { useState } from "react";
import { Button, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import * as ImagePicker from "expo-image-picker";

import Ionicons from "react-native-vector-icons/Ionicons";
import Octicons from "react-native-vector-icons/Octicons";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

export default function Add({ navigation }) {
  const [type, setType] = useState(CameraType.back);
  const [permission, requestPermission] = Camera.useCameraPermissions();
  const [camera, setCamera] = useState(null);
  // const [imageUri, setImageUri] = useState(null);
  const [image, setImage] = useState(null);

  if (!permission) {
    // Camera permissions are still loading
    return <View />;
  }

  if (!permission.granted) {
    // Camera permissions are not granted yet
    return (
      <View style={styles.container}>
        <Text style={{ textAlign: "center" }}>
          We need your permission to show the camera
        </Text>
        <Button onPress={requestPermission} title="grant permission" />
      </View>
    );
  }

  const pickImage = async () => {
    // No permissions request is necessary for launching the image library
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Image,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    }).then((result) => {
      if (!result.canceled) {
        const imageUri = result.assets[0].uri;
        navigation.navigate("Save", { imageUri });
      }
    });
  };

  const takePicture = async () => {
    if (camera) {
      const data = await camera.takePictureAsync(null);
      const imageUri = data.uri;
      navigation.navigate("Save", { imageUri });
    }
  };

  function toggleCameraType() {
    setType((current) =>
      current === CameraType.back ? CameraType.front : CameraType.back
    );
  }

  return (
    <View style={styles.container}>
      <Camera
        style={styles.camera}
        type={type}
        ratio={"1:1"}
        ref={(ref) => setCamera(ref)}
      >
        <View style={styles.buttonContainer}>
          <TouchableOpacity
            onPress={pickImage}
            style={{ alignItems: "center" }}
          >
            <FontAwesome5 name="images" color="white" size={35} />
          </TouchableOpacity>
          <TouchableOpacity
            onPress={takePicture}
            style={{ alignItems: "center" }}
          >
            <Octicons name="dot-fill" color="white" size={150} />
          </TouchableOpacity>
          <View style={styles.galleryBtn}>
            <TouchableOpacity onPress={toggleCameraType}>
              <Ionicons name="camera-reverse" color="white" size={35} />
            </TouchableOpacity>
          </View>
        </View>
      </Camera>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  camera: {
    flex: 1,
  },
  buttonContainer: {
    alignItems: "center",
    alignSelf: "center",
    position: "absolute",
    bottom: 10,
    justifyContent: "space-around",
    width: "100%",
    flexDirection: "row",
  },
  button: {
    flex: 1,
  },
  takePicBtn: {
    flex: 1,
    alignSelf: "flex-end",
    alignItems: "center",
  },
  text: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
});
