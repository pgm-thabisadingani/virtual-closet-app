import React from "react";
import { View, StyleSheet } from "react-native";
import { Swipeable } from "react-native-gesture-handler/Swipeable";
import { Avatar } from "../Avatar";

export const ChallengesListItem = ({ title, source, username, onPress }) => {
  return (
    <Swipeable renderRightActions={renderRightActions}>
      <TouchableHighlight
        activeOpacity={0.6}
        underlayColor={Colors.light}
        {...(onPress ? (onPress = { onPress }) : "")}
        style={styles.container}
      >
        <View>
          <Avatar size={25} source={source} />
          <View>
            <Text>{title}</Text>
            <Text>by {username}</Text>
          </View>
        </View>
      </TouchableHighlight>
    </Swipeable>
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
  },
});
