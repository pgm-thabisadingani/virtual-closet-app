import React from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { Avatar, FeedsTile, View } from "../components";

import { auth, Colors, FontSizes, Images } from "../config";

export const FeedsScreen = ({ navigation }) => {
  // const [isOnline, setIsOnline] = state(false)
  console.log(auth.currentUser);
  console.log(auth.currentUser.photoURL);
  console.log(auth.currentUser.displayName);
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
          onPress={() => console.log("Hello")}
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
      <View style={styles.challengeListContainer}>
        <View style={styles.latestChallenge}>
          <Text
            style={{
              fontSize: FontSizes.title,
              fontWeight: "bold",
              color: Colors.dark,
            }}
          >
            Latest challenge
          </Text>
          <TouchableHighlight
            activeOpacity={0.6}
            underlayColor={Colors.light}
            onPress={() => navigation.navigate("Challenges")}
          >
            <Text
              style={{
                fontSize: FontSizes.body,
                color: Colors.purple,
              }}
            >
              View All
            </Text>
          </TouchableHighlight>
        </View>
      </View>
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
  },
  feedsTileContainer: {
    marginVertical: 30,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  latestChallenge: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
