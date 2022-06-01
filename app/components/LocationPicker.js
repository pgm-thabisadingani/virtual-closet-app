import React from "react";
import { View, StyleSheet } from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
const GOOGLE_PLACES_API_KEY = "AIzaSyBfDVZqQznKVm8cHWCGleVgArkkt - _JU4o";
export const LocationPicker = () => {
  return (
    <GooglePlacesAutocomplete
      placeholder="Search"
      onPress={(data, details = null) => {
        // 'details' is provided when fetchDetails = true
        console.log(data, details);
      }}
      query={{
        key: GOOGLE_PLACES_API_KEY,
        language: "en",
      }}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});
