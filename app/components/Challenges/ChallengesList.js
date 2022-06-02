import React, { useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { ChallengesListItem } from "./ChallengesListItem";
import { Colors, db, FontSizes } from "../../config";
import { View } from "../View";
import { AppButton } from "../AppButton";
import { collection, onSnapshot, query } from "firebase/firestore";
import { LoadingIndicator } from "../LoadingIndicator";
import { Error } from "../Error";

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
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [challenges, setChallenges] = useState([0]); //first item of the array
  const navigation = useNavigation();

  // selects an item randomly
  const randomListItem = (challenges) => {
    const randomItem =
      challenges[Math.floor(Math.random() * challenges.length)];
    setItem(randomItem);
  };

  // get all the Challenges from database

  const setClosetAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "challenges"));
      onSnapshot(q, (snapshot) => {
        setChallenges(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error);
    }
  };

  useEffect(() => {
    const unsubscribe = setClosetAsync();
    return () => unsubscribe;
  }, []);

  return isLoading ? (
    <LoadingIndicator />
  ) : isError ? (
    <Error />
  ) : (
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
            title={item.eventTitle}
            source={item.creatorAvator}
            creator={item.creatorUserName}
            onPress={() =>
              navigation.navigate("ChallengeDetails", item.id, item.eventTitle)
            }
            feeds
          />
        ) : (
          <ChallengesListItem
            title={challenges[0].eventTitle}
            source={challenges[0].creatorAvator}
            creator={challenges[0].creatorUserName}
            onPress={() =>
              navigation.navigate("ChallengeDetails", challenges[0].id)
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
            onPress={() => randomListItem(challenges)}
            color={Colors.red}
          />
          <AppButton
            buttonWidth={150}
            size={20}
            textColor={Colors.white}
            title="YAY"
            onPress={() => navigation.navigate("ChallengeDetails", item.id)}
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
