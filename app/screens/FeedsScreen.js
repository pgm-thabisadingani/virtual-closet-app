import React, { useState } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";
import { AppButton, Avatar, Button, FeedsTile, View } from "../components";
import { ChallengesListItem } from "../components/list";

import { auth, Colors, FontSizes, Images } from "../config";
import { ChallengeDetailsScreen } from "./ChallengeDetailsScreen";

export const DATA = [
  {
    id: 1,
    title: "Job Interview",
    creator: "Blue",
    img: "https://api.lorem.space/image/fashion?w=100&h=100",
    date: "30 May",
    discription: " wanna look good ",
  },
  {
    id: 2,
    title: "Party",
    creator: "Maze",
    img: "https://api.lorem.space/image/fashion?w=100&h=100",
    date: "29 May",
    discription: " wanna look good ",
  },
  {
    id: 3,
    title: "Night Out",
    creator: "Jane",
    img: "https://api.lorem.space/image/fashion?w=100&h=100",
    date: "28 May",
    discription: " wanna look good ",
  },
];

export const FeedsScreen = ({ navigation }) => {
  const [item, setItem] = useState(0);

  // console.log(auth.currentUser);
  // console.log(auth.currentUser.photoURL);
  // console.log(auth.currentUser.displayName);
  const userName = auth.currentUser.displayName;

  // selects an item randomly
  const randomListItem = (DATA) => {
    const randomItem = DATA[Math.floor(Math.random() * DATA.length)];
    setItem(randomItem);
  };

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
      <View style={styles.challengeListContainer}>
        <View style={styles.latestChallenge}>
          <Text
            style={{
              fontSize: FontSizes.title,
              fontWeight: "bold",
              color: Colors.dark,
            }}
          >
            Top Challenge
          </Text>
        </View>
        {item ? (
          <ChallengesListItem
            title={item.title}
            source={item.img}
            creator={item.creator}
            onPress={() =>
              navigation.navigate("ChallengeDetails", item.id, item.title)
            }
            feeds
          />
        ) : (
          <ChallengesListItem
            title={DATA[0].title}
            source={DATA[0].img}
            creator={DATA[0].creator}
            onPress={() =>
              navigation.navigate("ChallengeDetails", DATA[0].id, DATA[0].title)
            }
            feeds
          />
        )}

        <View style={styles.buttons}>
          <AppButton
            buttonWidth={150}
            size={20}
            textColor={Colors.white}
            title="NAH"
            onPress={() => randomListItem(DATA)}
            color={Colors.red}
          />
          <AppButton
            buttonWidth={150}
            size={20}
            textColor={Colors.white}
            title="YAY"
            onPress={() =>
              navigation.navigate("ChallengeDetails", item.id, item.title)
            }
            color={Colors.green}
          />
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
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  latestChallenge: {
    marginVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
