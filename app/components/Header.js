import React from "react";
import { View, StyleSheet } from "react-native";
import { getHeaderTitle } from "@react-navigation/elements";

export const Header = ({ navigation, route, options, back }) => {
  const title = getHeaderTitle(options, route.name);

  return (
    <MyHeader
      title={title}
      leftButton={
        back ? <MyBackButton onPress={navigation.goBack} /> : undefined
      }
      style={options.headerStyle}
    />
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default Header;
