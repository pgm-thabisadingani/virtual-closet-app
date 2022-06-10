import { collection, onSnapshot, query, where } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { Colors, db, FontSizes } from "../../config";
import { EmptyView } from "../EmptyView";
import { LoadingIndicator } from "../LoadingIndicator";

export const ResponcesCouter = ({ challengeUid }) => {
  //getting items where challengeUid == challengeUid
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  console.log(challengeUid);
  const getResponsesAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "responses"),
        where("challengeUid", "==", challengeUid)
      );
      onSnapshot(q, (snapshot) => {
        setItems(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  console.log(items);

  // Keep track with changes in data add or delete. Clean up!
  useEffect(() => {
    const unsubscribe = getResponsesAsync();
    return () => unsubscribe;
  }, []);

  return isLoading ? (
    <LoadingIndicator />
  ) : isError ? (
    <>
      <Error />
    </>
  ) : (
    <View style={styles.container}>
      <Text style={styles.counterText}>{items.length}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 40,
    height: 40,
    borderRadius: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: Colors.light,
    overflow: "hidden",
    borderBottomColor: Colors.darkGray,
    borderBottomWidth: 1,
  },
  counterText: {
    fontSize: FontSizes.body,
    fontWeight: "700",
    color: Colors.dark,
  },
});
