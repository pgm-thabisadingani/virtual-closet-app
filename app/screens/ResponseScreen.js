import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { AppCloseWindow, View } from "../components";

export const ResponseScreen = ({ navigation, route }) => {
  const challengeUid = route.params;
  console.log(challengeUid);
  return (
    <View isSafe style={styles.container}>
      <AppCloseWindow onPress={() => navigation.goBack()} paddingSize={10} />
      <Text>Get responses with this challenge Uid: {challengeUid}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
