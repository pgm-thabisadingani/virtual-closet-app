import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Colors, FontSizes } from "../../config";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { View } from "../View";
import moment from "moment";
import { MaterialIcons } from "@expo/vector-icons";

export const ChallengesListItem = ({
  title,
  source,
  creator,
  onPress,
  eventDate,
  eventLocation,
  feeds,
}) => {
  const dateConverter = (date) => {
    return moment(date).format("ddd, D MMMM ");
  };
  return (
    <>
      {feeds ? (
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={Colors.light}
          onPress={onPress}
          style={styles.container}
        >
          <View>
            <View style={styles.containerDetails}>
              <Avatar size={80} source={source} />
              <View style={styles.containerText}>
                <Text style={styles.challengeTitle}>{title}</Text>
                <Text style={styles.challengeCreator}>{creator}</Text>
              </View>
            </View>
            <View style={styles.locationDetails}>
              <View style={styles.dateWrpper}>
                <Icon
                  name="calendar-month"
                  size={20}
                  color={Colors.lightGray}
                />
                <Text style={styles.textDate}>{dateConverter(eventDate)}</Text>
              </View>
              <View style={styles.weatherCondition}>
                <MaterialIcons
                  name="location-pin"
                  size={25}
                  color={Colors.lightGray}
                />
                <Text style={styles.challengeLocation}>{eventLocation}</Text>
              </View>
            </View>
          </View>
        </TouchableHighlight>
      ) : (
        <Swipeable>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={Colors.light}
            onPress={onPress}
            style={[
              styles.container,
              { height: 110, padding: 10, marginBottom: 2 },
            ]}
          >
            <View style={styles.swipeableTextWrapper}>
              <View>
                <Text style={styles.challengeTitle}>{title}</Text>
                <Text style={styles.challengeCreator}>
                  {dateConverter(eventDate)}
                </Text>
                <Text>{eventLocation}</Text>
              </View>
              <Icon
                name="chevron-right"
                size={25}
                color={Colors.lightGray}
                style={styles.icon}
              />
            </View>
          </TouchableHighlight>
        </Swipeable>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,

    backgroundColor: Colors.white,
    marginVertical: 20,
    borderRadius: 10,
    padding: 30,
    height: 200,
    overflow: "hidden",
  },
  containerDetails: {
    flexDirection: "row",
    alignItems: "center",
  },
  containerText: {
    marginLeft: 20,
  },
  challengeTitle: {
    fontSize: FontSizes.title,
    color: Colors.dark,
    textTransform: "capitalize",
  },
  challengeCreator: {
    fontSize: FontSizes.body,
    color: Colors.lightGray,
    textTransform: "capitalize",
  },
  swipeableTextWrapper: {
    padding: 5,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  locationDetails: {
    marginTop: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  weatherCondition: {
    borderLeftWidth: 1,
    borderLeftColor: Colors.midLight,
    width: "50%",
    alignItems: "center",
    paddingLeft: 20,
  },
  dateWrpper: { alignItems: "center" },
  challengeLocation: {
    fontSize: FontSizes.body,
    color: Colors.lightGray,
  },
  textDate: {
    fontSize: FontSizes.body,
    color: Colors.lightGray,
  },
});
