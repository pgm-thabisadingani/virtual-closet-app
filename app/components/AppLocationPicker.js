import React from "react";
import Constants from "expo-constants";
import { View, StyleSheet } from "react-native";
import { useFormikContext } from "formik";
import { FormErrorMessage } from "./FormErrorMessage";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { Colors } from "../config";

export const AppLocationPicker = ({ name }) => {
  const { errors, setFieldValue, touched } = useFormikContext();
  return (
    <View style={styles.container}>
      <GooglePlacesAutocomplete
        placeholder="Search City"
        onPress={(data, details = null) => {
          // 'details' is provided when fetchDetails = true
          console.log(data.structured_formatting.main_text);
          setFieldValue(name, data.structured_formatting.main_text);
        }}
        query={{
          key: Constants.manifest.extra.apiKeyGoogleVision,
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
