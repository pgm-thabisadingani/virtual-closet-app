import React from "react";
import { View, StyleSheet, Image, TouchableHighlight } from "react-native";

import { auth, Colors } from "../config";

export const Avatar = ({ size, onPress, source }) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={Colors.light}
      {...(onPress ? (onPress = { onPress }) : "")}
      style={styles.container}
    >
      <Image
        style={{
          width: size,
          height: size,
          borderRadius: size,
        }}
        source={{ uri: source }}
      />
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {},
});
