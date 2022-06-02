import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import {
  AppButton,
  Avatar,
  Button,
  FeedsTile,
  LocationPicker,
  View,
} from "../components";
import { ChallengesList } from "../components/challenges";
import { ChallengesListItem } from "../components/list";

import { auth, Colors, FontSizes, Images } from "../config";

export const FeedsScreen = ({ navigation }) => {
  const userName = auth.currentUser.displayName;
  return (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome, {userName}.</Text>
          <Text style={styles.introText}>Create or join a challenge.</Text>
        </View>
        <Avatar
          size={80}
          source={auth.currentUser.photoURL}
          onPress={() => navigation.navigate("Profile")}
        />
      </View>
      <View style={styles.feedsTileContainer}>
        <FeedsTile
          name="plus-circle-outline"
          title="Create"
          onPress={() => navigation.navigate("Create")}
          bgColor={Colors.purple}
          txColor={Colors.white}
        />
        <FeedsTile
          name="text-box-multiple"
          title="Challenges"
          onPress={() => navigation.navigate("Challenges")}
          bgColor={Colors.white}
          txColor={Colors.purple}
        />
        <FeedsTile
          name="tshirt-crew"
          title="Closet"
          onPress={() => navigation.navigate("Closet")}
          bgColor={Colors.white}
          txColor={Colors.purple}
        />
      </View>
      <ChallengesList />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 30,
  },
  headerContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  welcomeText: {
    fontSize: FontSizes.mainTitle,
    fontWeight: "700",
    textTransform: "capitalize",
    color: Colors.dark,
    lineHeight: 45,
  },
  introText: {
    color: Colors.gray,
    fontSize: FontSizes.body,
  },
  feedsTileContainer: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
