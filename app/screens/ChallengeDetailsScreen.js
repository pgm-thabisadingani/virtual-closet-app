import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "../components";

export const ChallengeDetailsScreen = ({ route, navigation }) => {
  const challangeID = route.params;
  return (
    <View style={styles.container}>
      <Text>{challangeID}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
