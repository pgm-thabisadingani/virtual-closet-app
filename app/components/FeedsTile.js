import React from "react";
import { View, StyleSheet, TouchableHighlight, Text } from "react-native";
import { Colors, FontSizes } from "../config";
import { Icon } from "./Icon";

export const FeedsTile = ({
  name,
  size = 30,
  title,
  onPress,
  bgColor,
  txColor,
}) => {
  return (
    <TouchableHighlight
      activeOpacity={0.6}
      underlayColor={Colors.light}
      style={[styles.container, { backgroundColor: bgColor }]}
      onPress={onPress}
    >
      <View style={styles.contect}>
        <Icon name={name} size={size} color={txColor} />
        <Text
          style={{
            color: txColor,
            paddingTop: 5,
            fontSize: FontSizes.body,
          }}
        >
          {title}
        </Text>
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,

    elevation: 8,
    width: "31%",
    height: 120,
    paddingTop: 55,
    paddingLeft: 10,
    borderRadius: 10,
    justifyContent: "flex-start",
  },
  contect: {},
});
