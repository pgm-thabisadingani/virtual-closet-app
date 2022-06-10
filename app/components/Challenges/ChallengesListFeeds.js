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

export const ChallengesListFeeds = () => {
  const [item, setItem] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [challenges, setChallenges] = useState([0]); //first item of the array or it will crush
  const navigation = useNavigation();

  // selects an item randomly
  const randomListItem = (challenges) => {
    const randomItem =
      challenges[Math.floor(Math.random() * challenges.length)];
    setItem(randomItem);
  };

  // get all the Challenges from database

  const setChallengesAsync = async () => {
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
      setIsError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = setChallengesAsync();
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
              navigation.navigate("Challenge Details", item.id, item.eventTitle)
            }
            feeds
          />
        ) : (
          <ChallengesListItem
            title={challenges[0].eventTitle}
            source={challenges[0].creatorAvator}
            creator={challenges[0].creatorUserName}
            onPress={() =>
              navigation.navigate("Challenge Details", challenges[0].id)
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
          {item ? (
            <AppButton
              buttonWidth={150}
              size={20}
              textColor={Colors.white}
              title="YAY"
              onPress={() => navigation.navigate("Challenge Details", item.id)}
              color={Colors.green}
            />
          ) : (
            <AppButton
              buttonWidth={150}
              size={20}
              textColor={Colors.white}
              title="YAY"
              onPress={() =>
                navigation.navigate("Challenge Details", challenges[0].id)
              }
              color={Colors.green}
            />
          )}
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
