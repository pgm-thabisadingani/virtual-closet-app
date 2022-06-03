import { doc, getDoc } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { Error, Icon, LoadingIndicator, View } from "../components";
import { ChallengeDetails } from "../components/challenges";
import { Colors, db } from "../config";

export const ChallengeDetailsScreen = ({ route, navigation }) => {
  const [challenge, setChallenge] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
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
      setIsLoading(false);
    }
  };

  const handleShowAdd = () => {};

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
  // <ChallengeDetails city={removeSpace(challenge.eventLocation)} />;

  return isError ? (
    <Error>{isError}</Error>
  ) : isLoading || !challenge ? (
    <LoadingIndicator />
  ) : (
    <View isSafe style={styles.container}>
      <Text>Challenge details</Text>
      <Text>{challengeUid}</Text>
      <View style={{ alignItems: "flex-end" }}>
        <Icon
          name="window-close"
          size={30}
          color={Colors.mediumGray}
          onPress={() => setShow(true)}
        />
      </View>
      {show ? (
        <View
          style={{
            backgroundColor: " rgba(0, 0, 0, 0.7)",
            height: "100%",
            width: "100%",
            justifyContent: "center",
            alignItems: "center",
            opacity: 0.4,
          }}
        >
          <View style={{ alignItems: "flex-end" }}>
            <Icon
              name="window-close"
              size={30}
              color={Colors.mediumGray}
              onPress={() => setShow(false)}
            />
          </View>
          <View>
            <Text style={{ fontSize: 30, color: Colors.white, opacity: 1 }}>
              Show me
            </Text>
          </View>
        </View>
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
