import React from "react";
import { TextInput as NativeTextInput } from "react-native";

import { View } from "./View";
import { Icon } from "./Icon";
import { Button } from "./Button";
import { Colors } from "../config";

export const TextInput = ({
  width = "100%",
  leftIconName,
  rightIcon,
  handlePasswordVisibility,
  ...otherProps
}) => {
  return (
    <View
      style={{
        backgroundColor: Colors.light,
        borderRadius: 5,
        flexDirection: "row",
        padding: 12,
        marginVertical: 12,
        width,
        borderWidth: 1,
        borderColor: Colors.light,
      }}
    >
      {leftIconName ? (
        <Icon
          name={leftIconName}
          size={22}
          color={Colors.lightGray}
          style={{ marginRight: 10 }}
        />
      ) : null}
      <NativeTextInput
        style={{
          flex: 1,
          width: "100%",
          fontSize: 18,
          color: Colors.dark,
        }}
        placeholderTextColor={Colors.mediumGray}
        {...otherProps}
      />
      {rightIcon ? (
        <Button onPress={handlePasswordVisibility}>
          <Icon
            name={rightIcon}
            size={22}
            color={Colors.lightGray}
            style={{ marginRight: 10 }}
          />
        </Button>
      ) : null}
    </View>
  );
};
