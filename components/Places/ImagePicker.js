import { Alert, Button, Image, StyleSheet, Text, View } from "react-native";
import {
  launchCameraAsync,
  useCameraPermissions,
  PermissionStatus,
  launchImageLibraryAsync,
  MediaTypeOptions,
} from "expo-image-picker";
import { useState } from "react";
import { Colors } from "../../constants/colors";
import OutlineButton from "./UI/OutlineButton";

export default function ImagePicker({ onImageTaken }) {
  const [pickedImage, setPickedImage] = useState();
  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();

  async function verfyPermissions() {
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions", "You Need to Grant permissions to Camera to use this App");
      return false;
    }

    return true;
  }
  async function takeImageHandler() {
    const hasPermissions = await verfyPermissions();
    if (!hasPermissions) return;
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      mediaTypes: MediaTypeOptions.All,
      quality: 1,
    });
    setPickedImage(image.assets[0].uri);
    onImageTaken(image.assets[0].uri);
  }

  let imagePreview = <Text>No Image Picked yet</Text>;
  //   console.log("Elvin Image:", pickedImage);
  if (pickedImage) {
    // console.log(pickedImage);
    imagePreview = <Image style={styles.image} source={{ uri: pickedImage }} />;
  }
  return (
    <View>
      <View style={styles.imagePreview}>{imagePreview}</View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>
        Take Image
      </OutlineButton>
    </View>
  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: "100%",
    height: 180,
    marginVertical: 8,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  image: {
    width: "100%",
    height: "100%",
  },
});
