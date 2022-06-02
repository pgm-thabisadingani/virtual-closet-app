import {
  collection,
  doc,
  documentId,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { View } from "../components";
import { ChallengeDetails } from "../components/challenges";
import { db } from "../config";

export const ChallengeDetailsScreen = ({ route, navigation }) => {
  const [challenge, setChallenge] = useState([]);
  const challengeUid = route.params;

  /*getting challenges where the id == challengeUid*/
  const getChallengeAsync = async () => {
    const q = await getDoc(doc(db, "challenges", challengeUid));

    if (q.exists()) {
      console.log("Document data:", q.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }
  };

  useEffect(() => {
    const unsubscribe = getChallengeAsync();
    return () => unsubscribe;
  }, []);

  console.log(challenge);

  // Remove space from for weather Api
  const removeSpace = (words) => {
    let other = words.replace(" ", "%20");
    return other;
  };

  return (
    <View isSafe style={styles.container}>
      <Text>Challenge details</Text>
      <Text>{challengeUid}</Text>
      <ChallengeDetails city={removeSpace("Brussels")} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
