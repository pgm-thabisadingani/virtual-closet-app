import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../../config";
import { Icon } from "../Icon";
import { View } from "../View";

export const CategoryListItem = (userUid) => {
  return (
    <>
      <View style={styles.container}></View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  icon: {},
});
