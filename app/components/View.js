import React from "react";
import { View as NativeView, StyleSheet } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

export const View = ({ isSafe, style, children }) => {
  const insets = useSafeAreaInsets();

  if (isSafe) {
    return (
      <NativeView style={{ paddingTop: insets.top, ...style }}>
        {children}
      </NativeView>
    );
  }

  return <NativeView style={StyleSheet.flatten(style)}>{children}</NativeView>;
};
