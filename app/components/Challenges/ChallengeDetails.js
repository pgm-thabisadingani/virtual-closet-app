import React from "react";
import { View, StyleSheet, Image, Text } from "react-native";
import { useFetch } from "../../hooks";
import { Error } from "../Error";
import { LoadingIndicator } from "../LoadingIndicator";
import moment from "moment";
import { Colors, FontSizes } from "../../config";

export const ChallengeDetails = ({ city, date }) => {
  const [data, isLoading, error] = useFetch({ city: city });

  // date converter
  const dateConverter = (date) => {
    return moment(date).format("ddd, D MMMM ");
  };

  return error ? (
    <Error>{error}</Error>
  ) : isLoading || !data ? (
    <LoadingIndicator />
  ) : (
    <View style={styles.container}>
      <Text style={styles.smallText}>{data && dateConverter(date)}</Text>
      <View>
        <Image
          style={styles.weatherIcon}
          source={{
            uri: `http://openweathermap.org/img/wn/${
              data.weather && data.weather[0].icon
            }@2x.png`,
          }}
        />
        {/* <Text>{data.weather && data.weather[0].main}</Text> */}
      </View>
      <Text style={styles.smallText}>
        {Math.round(data.main && data.main.temp_max - 273)}°/
        {Math.round(data.main && data.main.temp_min - 273)}°C
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingBottom: 30,
    borderBottomWidth: 1,
    borderBottomColor: Colors.midLight,
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderBottomColor: Colors.midLight,
  },
  weatherIcon: {
    width: 50,
    height: 50,
    backgroundColor: Colors.white,
    borderRadius: 50,
  },
  smallText: {
    fontSize: FontSizes.body,
    fontWeight: "400",
    color: Colors.mediumGray,
  },
});
