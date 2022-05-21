import React from "react";
import { StyleSheet, Text } from "react-native";
import { Avatar, FeedsTile, View } from "../components";

import { auth, Colors, FontSizes, Images } from "../config";

export const FeedsScreen = () => {
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
          onPress={() => console.log("create")}
          bgColor={Colors.purple}
          txColor={Colors.white}
        />
        <FeedsTile
          name="text-box-multiple"
          title="Challenges"
          onPress={() => console.log("Challenges")}
          bgColor={Colors.white}
          txColor={Colors.purple}
        />
        <FeedsTile
          name="tshirt-crew"
          title="Closet"
          onPress={() => console.log("Closet")}
          bgColor={Colors.white}
          txColor={Colors.purple}
        />
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
});
