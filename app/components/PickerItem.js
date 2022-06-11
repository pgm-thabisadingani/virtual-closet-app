import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";
import { Colors } from "../config";

export const PickerItem = ({ item, onPress, closet }) => {
  return !closet ? (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  ) : (
    <TouchableOpacity onPress={onPress}>
      <Text style={styles.text}>{item.title}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  text: {
    padding: 20,
  },
});
