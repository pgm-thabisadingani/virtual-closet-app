import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Error, LoadingIndicator, View } from "../components";
import { ChallengeDetails } from "../components/challenges";
import { db } from "../config";

export const ChallengeDetailsScreen = ({ route, navigation }) => {
  const [challenge, setChallenge] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const challengeUid = route.params;

  /*getting challenges by doc id */
  const getChallengeAsync = async () => {
    setIsLoading(true);
    const q = await getDoc(doc(db, "challenges", challengeUid));
    if (q.exists()) {
      setChallenge(q.data());
      setIsLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setIsError(true);
      setIsLoading(true);
    }
  };

  useEffect(() => {
    const unsubscribe = getChallengeAsync();
    return () => unsubscribe;
  }, []);

  console.log(challenge.eventLocation);

  // Remove space from for weather Api
  const removeSpace = async (words) => {
    setIsLoading(true);
    try {
      let other = await words.replace(" ", "%20");
      setIsLoading(false);
      return other;
    } catch (error) {
      setIsError(error.message);
    }
  };

  return isError ? (
    <Error>{isError}</Error>
  ) : isLoading || !challenge ? (
    <LoadingIndicator />
  ) : (
    <View isSafe style={styles.container}>
      <Text>Challenge details</Text>
      <Text>{challengeUid}</Text>

      <ChallengeDetails city={removeSpace(challenge.eventLocation)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
