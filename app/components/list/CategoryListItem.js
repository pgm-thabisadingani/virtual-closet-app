import React from "react";
import { StyleSheet, Text } from "react-native";
import { Colors } from "../../config";
import { Icon } from "../Icon";
import { View } from "../View";

export const CategoryListItem = ({
  name,
  onPress,
  title,
  color,
  size = 25,
}) => {
  return (
    <>
      <View style={styles.container}>
        <Icon
          name={name}
          size={size}
          color={color}
          style={styles.icon}
          onPress={onPress}
        />
        <Text style={styles.categoryTitle}>{title}</Text>
      </View>
    </>
  );
};
const styles = StyleSheet.create({
  container: {
    height: 50,
  },
  icon: {},
});
