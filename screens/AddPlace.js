import PlaceForm from "../components/Places/PlaceForm";
import { insertPlace } from "../util/database";

export default function AddPlace({ navigation }) {
  async function createPlaceHandler(place) {
    // await insertPlace(place);
    navigation.navigate("AllPlaces", {
      place,
    });
  }
  return <PlaceForm onCreatePlace={createPlaceHandler} />;
}
