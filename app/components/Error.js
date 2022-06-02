import React from "react";
import { View, StyleSheet, Text } from "react-native";

export const Error = ({ children }) => {
  return (
    <View style={styles.container}>
      <Text>{children}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
