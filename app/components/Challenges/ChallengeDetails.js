import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useFetch } from "../../hooks";
import { Error } from "../Error";
import { LoadingIndicator } from "../LoadingIndicator";

export const ChallengeDetails = (props) => {
  const [data, isLoading, error] = useFetch({ city: props.city });
  console.log(data.name);

  return (
    <>
      {error ? (
        <Error>{error}</Error>
      ) : isLoading || !data ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.container}>
          <Text>{data.name}</Text>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

export default ChallengeDetails;
