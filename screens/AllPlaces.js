import { useEffect, useState } from "react";
import PlacesList from "../components/Places/PlacesList";
import { useIsFocused } from "@react-navigation/native";

export default function AllPlaces({ route }) {
  const isFocused = useIsFocused();
  const [loadedPlace, setLoadedPlace] = useState([]);
  useEffect(() => {
    if (isFocused && route.params) {
      setLoadedPlace((currPlaces) => {
        return [...currPlaces, route.params.place];
      });
    }
  }, [isFocused, route]);

  return <PlacesList places={loadedPlace} />;
}
