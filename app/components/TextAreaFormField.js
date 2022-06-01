import React, { useState } from "react";
import { StyleSheet, TextInput as NativeTextArea } from "react-native";

import { View } from "./View";
import { Colors } from "../config";

export const TextAreaFormField = ({
  width = "100%",
  leftIconName,
  ...otherProps
}) => {
  const [value, onChangeText] = useState("Start writing ...");

  // If you type something in the text box that is a color, the background will change to that
  // color.
  return (
    <View
      style={{
        backgroundColor: Colors.light,
        borderRadius: 5,
        width,
        flex: 1,
        marginVertical: 12,
        padding: 12,
        borderWidth: 1,
        borderColor: Colors.light,
      }}
    >
      <NativeTextArea
        style={{
          flex: 1,
          width: "100%",
          fontSize: 18,
          color: Colors.dark,
          textAlignVertical: "top",
        }}
        multiline
        numberOfLines={5}
        onChangeText={(text) => onChangeText(text)}
        value={value}
        placeholderTextColor={Colors.lightGray}
        {...otherProps}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
