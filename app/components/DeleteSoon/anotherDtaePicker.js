import React, { useState } from "react";
import { Formik, useField, useFormikContext } from "formik";
import { Button, SafeAreaView, StyleSheet, Text, View } from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";

export const DatePickerField = ({ name }) => {
  const [datePicker, setDatePicker] = useState(false);
  const [date, setDate] = useState(new Date());

  const { setFieldValue } = useFormikContext();

  function showDatePicker() {
    setDatePicker(true);
  }

  function onDateSelected(event, value) {
    setFieldValue(name, value);
    setDate(value);
    setDatePicker(false);
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <Text style={styleSheet.text}>Date = {date.toDateString()}</Text>
      <View style={styleSheet.MainContainer}>
        {datePicker && (
          <DateTimePicker
            value={date}
            mode={"date"}
            display={Platform.OS === "ios" ? "spinner" : "default"}
            is24Hour={true}
            onChange={onDateSelected}
            style={styleSheet.datePicker}
          />
        )}
        {!datePicker && (
          <View style={{ margin: 10 }}>
            <Button
              title="Show Date Picker"
              color="green"
              onPress={showDatePicker}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

const styleSheet = StyleSheet.create({
  MainContainer: {
    flex: 1,
    padding: 6,
    alignItems: "center",
    backgroundColor: "white",
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
});
