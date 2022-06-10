import React from "react";
import { View as NativeView, StyleSheet, SafeAreaView } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import Constants from "expo-constants";

export const View = ({ isSafe, style, children }) => {
  const insets = useSafeAreaInsets();

  if (isSafe) {
    return (
      <SafeAreaView style={[styles.screen, style]}>
        <View
          style={[
            style,
            styles.view,
            { paddingHorizontal: 25, paddingTop: insets.top, ...style },
          ]}
        >
          {children}
        </View>
      </SafeAreaView>
    );
  }

  return <NativeView style={StyleSheet.flatten(style)}>{children}</NativeView>;
};

const styles = StyleSheet.create({
  screen: {
    paddingTop: Constants.statusBarHeight,
    flex: 1,
  },
  view: {
    flex: 1,
  },
});

// <SafeAreaView style={styles.screen}>
//   <NativeView
//     style={{ paddingHorizontal: 25, paddingTop: insets.top, ...style }}
//   >
//     {children}
//   </NativeView>
// </SafeAreaView>;
