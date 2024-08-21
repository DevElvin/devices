const GOOGLE_API_KEY = "AIzaSyB7nCaja07uDiy_-IT8wtEz0Yubhwd610o";

export default function getMapPreview(lat, lng) {
  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${lat},${lng}&zoom=14&size=200x200&maptype=roadmap
&markers=color:blue%7Clabel:S%7C${lat},${lng}
&key=${GOOGLE_API_KEY}`;
  return imagePreviewUrl;
}

export async function getAdress(lat, lng) {
  const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
  const response = await fetch(url);
  if (!response) {
    throw new Error("Failed to fetch address");
  }
  const data = await response.json();
  const address = data.results[0].formatted_address;
  return address;
}
