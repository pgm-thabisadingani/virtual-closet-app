import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "../components";
import { ChallengeDetails } from "../components/challenges";

export const ChallengeDetailsScreen = ({ route, navigation }) => {
  const [challenge, setChallenge] = useState("");

  // Remove space from for weather Api
  const removeSpace = (words) => {
    let other = words.replace(" ", "%20");
    return other;
  };

  return (
    <View style={styles.container}>
      <Text>Challenge details</Text>
      <ChallengeDetails city={removeSpace("Brussels")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
