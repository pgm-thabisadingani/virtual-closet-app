import React from "react";
import { View, StyleSheet } from "react-native";
import { Colors } from "../config";
import { Icon } from "./Icon";

export const AppCloseWindow = ({ onPress, paddingSize = 20 }) => {
  return (
    <View style={[styles.container, { padding: paddingSize }]}>
      <Icon
        name="window-close"
        size={30}
        color={Colors.mediumGray}
        onPress={onPress}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "flex-end",
    padding: 20,
  },
});
