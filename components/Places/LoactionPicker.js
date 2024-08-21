import { Alert, Image, ScrollView, StyleSheet, Text, View } from "react-native";
import OutlineButton from "./UI/OutlineButton";
//AIzaSyBIAg6VNnHPHtJvBK1GCUeJ4jBX5UN-Lj0 MY GOOGLE API
//AIzaSyB7nCaja07uDiy_-IT8wtEz0Yubhwd610o
//AIzaSyB7nCaja07uDiy_-IT8wtEz0Yubhwd610o
//AIzaSyDJO3fpzKflxe3kQUpvOfsdcfJvzdPombg for jerry
import { getCurrentPositionAsync, PermissionStatus, useForegroundPermissions } from "expo-location";
import { Colors } from "../../constants/colors";
import { useEffect, useState } from "react";
import getMapPreview, { getAdress } from "../../util/location";
import { useIsFocused, useNavigation, useRoute } from "@react-navigation/native";

export default function LoactionPicker({ onLocationPicked }) {
  const navigation = useNavigation();
  const route = useRoute();
  const isFocused = useIsFocused();
  const [locationPermissionIformation, requestPermission] = useForegroundPermissions();
  const [pickedLocation, setPickedLocation] = useState();

  useEffect(() => {
    if (isFocused && route.params) {
      const mapPickedLocation = { lat: route.params.pickedLat, lng: route.params.pickedLng };
      setPickedLocation(mapPickedLocation);
      console.log(mapPickedLocation);
    }
  }, [route, isFocused]);

  useEffect(() => {
    async function handleLocation() {
      if (pickedLocation) {
        const address = await getAdress(pickedLocation.lat, pickedLocation.lng);
        onLocationPicked({ ...pickedLocation, address });
      }
    }
    handleLocation();
  }, [pickedLocation, onLocationPicked]);

  async function verifyPermissions() {
    if (locationPermissionIformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (locationPermissionIformation.status === PermissionStatus.DENIED) {
      Alert.alert("Insufficient Permissions", "Please allow the app to access location");
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
  }
  async function getLocationHandler() {
    const hasPermissions = await verifyPermissions();
    if (!hasPermissions) return;
    const location = await getCurrentPositionAsync();
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }
  function pickOnMapHandler() {
    navigation.navigate("Map");
  }

  let locationPreview = <Text>No Location picked yet</Text>;
  if (pickedLocation) {
    locationPreview = (
      <Image style={styles.image} source={{ uri: getMapPreview(pickedLocation.lat, pickedLocation.lng) }} />
    );
  }
  return (
    <View>
      <View style={styles.mapPreview}>{locationPreview}</View>

      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mapPreview: {
    marginVertical: 8,
    width: "100%",
    height: 180,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.primary100,
    borderRadius: 4,
  },
  actions: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    borderRadius: 4,
  },
});
