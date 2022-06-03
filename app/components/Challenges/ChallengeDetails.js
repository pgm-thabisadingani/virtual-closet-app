import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useFetch } from "../../hooks";
import { Error } from "../Error";
import { LoadingIndicator } from "../LoadingIndicator";

export const ChallengeDetails = ({ city }) => {
  const [data, isLoading, error] = useFetch({ city: city });

  // <Text>{Math.round(data.main.temp_max - 273)}</Text>
  // const convertTemp = (temp) => {
  //   return Math.round(temp - 273);
  // };
  // <Text>{data.weather[0].main}</Text>

  return error ? (
    <Error>{error}</Error>
  ) : isLoading || !data ? (
    <LoadingIndicator />
  ) : (
    <View style={styles.container}>
      <Text></Text>
      <Text></Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
