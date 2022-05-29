import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors } from "../../config";

export const ClothingListItem = ({ items }) => {
  return (
    <View style={styles.container}>
      <Text>{items.item.title}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.purple,
    borderWidth: 1,
    height: 160,
    width: 105,
    marginBottom: 20,
  },
});
