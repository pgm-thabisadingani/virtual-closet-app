import React, { useState } from "react";
import { useFormikContext } from "formik";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Colors, FontSizes } from "../config";
import { FormErrorMessage } from "./FormErrorMessage";

export const AppDatePicker = ({ name }) => {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [eventDate, setEventDate] = useState(new Date());

  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  const handleConfirm = (date) => {
    console.log("A date has been set: ", date);
    setEventDate(date);
    setFieldValue(name, date);
    hideDatePicker();
  };
  const { errors, setFieldValue, touched } = useFormikContext();
  return (
    <SafeAreaView style={styles.container}>
      <View>
        <View style={styles.viewContainer}>
          <Button title="Pick a date" onPress={showDatePicker} />
          <Text style={styles.datePreview}>{eventDate.toDateString()}</Text>
        </View>
        <DateTimePickerModal
          isVisible={isDatePickerVisible}
          mode="date"
          onConfirm={handleConfirm}
          onCancel={hideDatePicker}
        />
        <FormErrorMessage error={errors[name]} visible={touched[name]} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: 30,
    marginTop: 15,
  },
  viewContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },

  text: {
    fontSize: 25,
    color: "red",
    padding: 3,
    marginBottom: 10,
    textAlign: "center",
  },

  // Style for iOS ONLY...
  datePicker: {
    justifyContent: "center",
    alignItems: "flex-start",
    width: 320,
    height: 260,
    display: "flex",
  },
  datePreview: {
    width: "70%",
    backgroundColor: Colors.light,
    paddingHorizontal: 10,
    paddingVertical: 15,
    fontSize: FontSizes.body,
    borderRadius: 5,
  },
});
