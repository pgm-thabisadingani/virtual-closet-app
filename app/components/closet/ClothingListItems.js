import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, View, ScrollView } from "react-native";
import "react-native-get-random-values";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { auth, Colors, database, db } from "../../config";

import { LoadingIndicator } from "../LoadingIndicator";
import { Error } from "../Error";
import { ClothingItem } from "./ClothingItem";

// I will use this for filtering or searching
// const museums = query(collectionGroup(db, 'clothing'), where('type', '==', 'museum'));
// const querySnapshot = await getDocs(museums);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, ' => ', doc.data());
// });

export const ClothingListItems = () => {
  const [items, setItems] = useState([]);
  const userUid = auth.currentUser.uid;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

  //getting items where closetceator Uid == userUid
  const getClosetAsync = async () => {
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

  console.log(items);

  return isError ? (
    <Error>{isError}</Error>
  ) : isLoading || !items ? (
    <LoadingIndicator />
  ) : (
    <View style={styles.container}>
      {items.length !== null ? (
        <>
          <FlatList
            data={items}
            keyExtractor={(item) => item.id} // returns a number which you have to conver to string
            numColumns={2}
            renderItem={({ item }) => (
              <View style={styles.itemContainer}>
                <ClothingItem items={item} />
              </View>
            )}
          />
        </>
      ) : (
        <View style={styles.containerEmpty}>
          <Text>Now let's add some items to the closet</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
  itemContainer: {
    flex: 1,

    justifyContent: "center",
  },
  containerEmpty: {
    flex: 1,
    backgroundColor: Colors.purple,
  },
});
