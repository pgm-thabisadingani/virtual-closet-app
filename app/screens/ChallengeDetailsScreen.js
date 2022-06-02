import React from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "../components";
import { ChallengeDetails } from "../components/challenges";

export const ChallengeDetailsScreen = ({ route, navigation }) => {
  return (
    <View style={styles.container}>
      <Text>Weather</Text>
      <ChallengeDetails city="Brussels" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
