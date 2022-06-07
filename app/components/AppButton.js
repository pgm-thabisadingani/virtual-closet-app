import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, FontSizes } from "../config";

export const AppButton = ({
  size = 40,
  icon,
  iconColor,
  textColor,
  title,
  onPress,
  color = "purple",
  buttonWidth = "100%",
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        { backgroundColor: color },
        { width: buttonWidth },
      ]}
      onPress={onPress}
      activeOpacity={0.6}
      underlayColor={Colors.light}
    >
      <>
        {title ? (
          <Text style={[styles.text, { color: textColor }]}>{title}</Text>
        ) : (
          <MaterialCommunityIcons
            icon={icon}
            name={icon}
            size={size * 0.5}
            color={color}
          />
        )}
      </>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: Colors.purple,
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
    padding: 15,
    marginVertical: 10,

    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },

  text: {
    color: Colors.white,
    fontSize: FontSizes.body,
    textTransform: "uppercase",
    fontWeight: "bold",
  },
});
