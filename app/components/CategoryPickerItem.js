import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

export const CategoryPickerItem = ({ item, onPress }) => {
  return (
    <View style={styles.category}>
      <TouchableOpacity onPress={onPress}>
        <Text>{item.title}</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  category: {
    paddingHorizontal: 25,
    paddingVertical: 15,
    alignItems: "center",
    width: "33%",
  },
  label: {
    marginTop: 5,
    textAlign: "center",
  },
});
