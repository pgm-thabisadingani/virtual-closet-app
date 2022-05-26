import React from "react";
import { StyleSheet, Text } from "react-native";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { View, Icon } from "../components";
import { auth } from "../config";
import { AddImageItem } from "../components";

export const EditClothingItemScreen = (props) => {
  // I will use this for filtering or searching
  // const museums = query(collectionGroup(db, 'clothing'), where('type', '==', 'museum'));
  // const querySnapshot = await getDocs(museums);
  // querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  // });
  return (
    <View isSafe style={styles.container}>
      <Text>This is a closet screen</Text>
      <AddImageItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
