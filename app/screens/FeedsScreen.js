import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text, TouchableHighlight } from "react-native";

import {
  AppButton,
  Avatar,
  Button,
  Error,
  FeedsTile,
  LoadingIndicator,
  LocationPicker,
  View,
} from "../components";
import { ChallengesListFeeds } from "../components/challenges";
import { auth, Colors, db, FontSizes, Images } from "../config";

export const FeedsScreen = ({ navigation }) => {
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userUid = auth.currentUser.uid;

  /*getting user where === userUid*/
  const getUserAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "users"), where("uid", "==", userUid));
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setUser({ ...doc.data(), id: doc.id });
        });
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  /*Keep track with changes in data add or delete. Clean up!*/
  useEffect(() => {
    const unsubscribe = getUserAsync();
    return () => unsubscribe;
  }, []);

  return isError ? (
    <Error>{isError}</Error>
  ) : isLoading || !user ? (
    <LoadingIndicator />
  ) : (
    <View style={styles.container}>
      <View style={styles.headerContainer}>
        <View>
          <Text style={styles.welcomeText}>Welcome, {user.username}.</Text>
          <Text style={styles.introText}>Create or accept a challenge.</Text>
        </View>
        <Avatar
          size={80}
          source={user.photoURL}
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
      <ChallengesListFeeds />
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
