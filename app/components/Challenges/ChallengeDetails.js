import React from "react";
import { View, StyleSheet } from "react-native";
import { useFetch } from "../../hooks";

export const ChallengeDetails = (props) => {
  const [data, isLoading, error] = useFetch({ city: props.city });
  console.log(data);

  return <View style={styles.container}></View>;
};

const styles = StyleSheet.create({
  container: {},
});

export default ChallengeDetails;
