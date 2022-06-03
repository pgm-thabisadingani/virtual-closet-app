import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList, View, ScrollView } from "react-native";
import "react-native-get-random-values";
import { collection, query, where, onSnapshot } from "firebase/firestore";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { auth, Colors, database, db } from "../../config";
import { ClothingItem } from "../ClothingItem";

// I will use this for filtering or searching
// const museums = query(collectionGroup(db, 'clothing'), where('type', '==', 'museum'));
// const querySnapshot = await getDocs(museums);
// querySnapshot.forEach((doc) => {
//     console.log(doc.id, ' => ', doc.data());
// });

export const ClothingListItems = () => {
  const [items, setItems] = useState([]);
  const userUid = auth.currentUser.uid;

  //getting items where closetceator Uid == userUid
  const setClosetAsync = async () => {
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
    });
  };

  // Keep track with changes in data add or delete. Clean up!
  useEffect(() => {
    const unsubscribe = setClosetAsync();
    return () => unsubscribe;
  }, []);

  console.log(items);

  return (
    <ScrollView style={styles.container}>
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
    </ScrollView>
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
