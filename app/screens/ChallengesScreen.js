import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { DatePickerField } from "../components";

export const ChallengesScreen = (props) => {
  const removeSpace = (words) => {
    // let joinedWord = words.split(" ").join("%20");
    let other = words.replace(" ", "%20");
    return other;
  };

  return (
    <View style={styles.container}>
      <Text>This is a {removeSpace("Challenges Screen")}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
