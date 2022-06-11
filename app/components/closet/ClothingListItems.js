import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, View } from "react-native";
import "react-native-get-random-values";
import { collection, query, where, onSnapshot } from "firebase/firestore";

import { auth, Colors, database, db } from "../../config";

import { LoadingIndicator } from "../LoadingIndicator";
import { Error } from "../Error";
import { ClothingItem } from "./ClothingItem";
import { EmptyView } from "../EmptyView";

// I will use this for filtering or searching
// const museums = query(collectionGroup(db, 'clothing'), where('type', '==', 'museum'));
// const querySnapshot = await getDocs(museums);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, ' => ', doc.data());
// });

export const ClothingListItems = ({ category }) => {
  const [items, setItems] = useState([]);
  const userUid = auth.currentUser.uid;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //getting items where closetceator Uid == userUid
  const getClosetAsync = async (category) => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "clothing"),
        where("closetOwerUid", "==", userUid)
      );

      onSnapshot(q, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setItems(results);
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  // Keep track with changes in data add or delete. Clean up!
  useEffect(() => {
    const unsubscribe = getClosetAsync();
    return () => unsubscribe;
  }, []);

  return isLoading ? (
    <LoadingIndicator />
  ) : isError || !items.length ? (
    <>
      <Error />
      <EmptyView message="Your closet is empty, add items." marginSize={65} />
    </>
  ) : (
    <View style={styles.container}>
      <>
        <FlatList
          data={items}
          keyExtractor={(item) => item.id} // returns a number which you have to conver to string
          numColumns={2}
          renderItem={({ item }) => <ClothingItem items={item} />}
        />
      </>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: -30,
    marginHorizontal: -10,
  },
  itemContainer: {
    justifyContent: "space-between",
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
});
