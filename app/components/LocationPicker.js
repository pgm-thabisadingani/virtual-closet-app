import React from "react";
import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { FormErrorMessage } from "./FormErrorMessage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Colors } from "../config";
const GOOGLE_PLACES_API_KEY = "AIzaSyBfDVZqQznKVm8cHWCGleVgArkkt - _JU4o";

export const LocationPicker = ({ name }) => {
  const { errors, setFieldValue, touched } = useFormikContext();
  return (
    <View style={styles.container} listMode="SCROLLVIEW">
      <GooglePlacesAutocomplete
        placeholder="Search location"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data.structured_formatting.main_text);
          setFieldValue(name, data.structured_formatting.main_text);
        }}
        query={{
          key: GOOGLE_PLACES_API_KEY,
          language: "en",
        }}
      />
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 5,
    marginBottom: 30,
    paddingTop: Constants.statusBarHeight + 10,
    backgroundColor: Colors.light,
  },
});
