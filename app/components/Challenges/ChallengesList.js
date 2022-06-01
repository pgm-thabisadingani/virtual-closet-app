import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { ChallengesListItem } from "./ChallengesListItem";
import { Colors, FontSizes } from "../../config";
import { View } from "../View";
import { AppButton } from "../AppButton";

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

export const ChallengesList = () => {
  const [item, setItem] = useState(0);
  const navigation = useNavigation();

  // selects an item randomly
  const randomListItem = (DATA) => {
    const randomItem = DATA[Math.floor(Math.random() * DATA.length)];
    setItem(randomItem);
  };

  return (
    <View style={styles.container}>
      <View style={styles.challengeListContainer}>
        <View style={styles.latestChallenge}>
          <Text
            style={{
              fontSize: FontSizes.title,
              fontWeight: "bold",
              color: Colors.dark,
              marginBottom: -15,
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
  container: {},
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
