import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { Colors, FontSizes } from "../../config";
import { Avatar } from "../Avatar";
import { Icon } from "../Icon";
import { View } from "../View";

export const ChallengesListItem = ({
  title,
  source,
  creator,
  onPress,
  renderRightActions,
  feeds,
}) => {
  return (
    <>
      {feeds ? (
        <TouchableHighlight
          activeOpacity={0.6}
          underlayColor={Colors.light}
          onPress={onPress}
          style={styles.container}
        >
          <View style={styles.containerDetails}>
            <Avatar size={70} source={source} />
            <View style={styles.containerText}>
              <Text style={styles.challengeTitle}>{title}</Text>
              <Text style={styles.challengeCreator}>by {creator}</Text>
            </View>
          </View>
        </TouchableHighlight>
      ) : (
        <Swipeable>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={Colors.light}
            onPress={onPress}
            style={styles.container}
          >
            <>
              <View>
                <Avatar size={25} source={source} />
                <View>
                  <Text style={styles.challengeTitle}>{title}</Text>
                  <Text style={styles.challengeCreator}>by {creator}</Text>
                </View>
              </View>
              <Icon
                name="chevron-right"
                size={25}
                color={Colors.lightGray}
                style={styles.icon}
              />
            </>
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
    padding: 15,
    height: 200,
    overflow: "hidden",
  },
  containerDetails: {
    flexDirection: "row",
  },
  containerText: {
    marginLeft: 10,
  },
  challengeTitle: {
    fontSize: FontSizes.title,
    color: Colors.dark,
  },
  challengeCreator: {
    fontSize: FontSizes.body,
    color: Colors.lightGray,
  },
});
