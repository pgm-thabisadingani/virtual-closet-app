import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors, FontSizes } from "../config";

export const CategoryPickerItem = ({ item, onPress }) => {
  return (
    <View style={styles.category}>
      <TouchableOpacity onPress={onPress}>
        <Text style={styles.titleText}>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    alignItems: "center",
    width: "26%",
    borderColor: Colors.purple,
    borderWidth: 1,
    margin: 10,
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
  titleText: {
    fontSize: FontSizes.body,
  },
});
