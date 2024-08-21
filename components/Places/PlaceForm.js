import { useCallback, useState } from "react";
import { SafeAreaView, ScrollView, StyleSheet, Text, TextInput, View } from "react-native";
import { useWindowDimensions } from "react-native";
import { Colors } from "../../constants/colors";
import ImagePicker from "./ImagePicker";
import LoactionPicker from "./LoactionPicker";
import Button from "./UI/Button";
import { Place } from "../../models/place";

export default function PlaceForm({ onCreatePlace }) {
  const [eneteredTitle, setEnteredTitle] = useState("");
  const [pickedLocation, setPickedLocation] = useState();
  const [selectedImage, setSelectedImage] = useState();

  function changeTitleHandler(enteredText) {
    setEnteredTitle(enteredText);
  }
  function takeImageHandler(imageUri) {
    setSelectedImage(imageUri);
  }
  const pickLocationHandler = useCallback((location) => {
    setPickedLocation(location);
  }, []);

  function savePlaceHandler() {
    const placeData = new Place(eneteredTitle, selectedImage, pickedLocation);
    onCreatePlace(placeData);
  }
  return (
    <SafeAreaView style={styles.form}>
      <ScrollView>
        <View>
          <Text style={styles.label}>Title</Text>
          <TextInput style={styles.input} onChangeText={changeTitleHandler} value={eneteredTitle} />
        </View>
        <ImagePicker onImageTaken={takeImageHandler} />
        <LoactionPicker onLocationPicked={pickLocationHandler} />
        <Button onPress={savePlaceHandler}>Save</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: "bold",
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: Colors.primary700,
    borderBottomWidth: 2,
    backgroundColor: Colors.primary100,
  },
});
