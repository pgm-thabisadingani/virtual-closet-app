import {
  collection,
  onSnapshot,
  orderBy,
  query,
  where,
} from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { EmptyView, Error, Icon, LoadingIndicator, View } from "../components";
import { ChallengesListItem } from "../components/challenges";
import { auth, Colors, db, FontSizes } from "../config";

export const ChallengesScreen = ({ navigation }) => {
  const [challenges, setChallenges] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const userUid = auth.currentUser.uid;

  const getChallengesAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "challenges"),
        where("creatorUid", "==", userUid)
      );
      onSnapshot(q, (snapshot) => {
        const data = [];
        snapshot.forEach((doc) => {
          data.push({ ...doc.data(), id: doc.id });
        });
        setChallenges(data);
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = getChallengesAsync();
    return () => unsubscribe;
  }, []);
  console.log(challenges);

  return isLoading ? (
    <LoadingIndicator />
  ) : isError || !challenges.length ? (
    <>
      <Error />
      <View style={{ marginTop: 200 }}>
        <EmptyView title="Challenges" />
      </View>
      <View style={styles.createIconWrapper}>
        <Icon
          name="plus-circle"
          size={100}
          onPress={() => navigation.navigate("Create")}
          color={Colors.lightPurple}
          style={styles.createIcon}
        />
      </View>
    </>
  ) : (
    <View isSafe style={styles.container}>
      <View style={styles.challengeListContainer}></View>
      <View style={styles.container}>
        <View style={styles.latestChallenge}>
          <Text
            style={{
              fontSize: FontSizes.title,
              fontWeight: "bold",
              color: Colors.dark,
              marginBottom: -15,
            }}
          >
            Your recent Challenges
          </Text>
        </View>
        <View style={styles.createIconWrapper}>
          <Icon
            name="plus-circle"
            size={100}
            onPress={() => navigation.navigate("Create")}
            color={Colors.lightPurple}
            style={styles.createIcon}
          />
        </View>
        <FlatList
          data={challenges}
          keyExtractor={(item) => item.id} // returns a number which you have to conver to string
          renderItem={({ item }) => (
            <View style={styles.itemContainer}>
              <ChallengesListItem
                title={item.eventTitle}
                source={item.creatorAvator}
                creator={item.creatorUserName}
                onPress={() =>
                  navigation.navigate(
                    "ChallengeDetails",
                    item.id,
                    item.eventTitle
                  )
                }
              />
            </View>
          )}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  latestChallenge: {
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  createIconWrapper: {
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 0,
    zIndex: 100,
  },
  createIcon: {
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
