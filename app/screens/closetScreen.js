import React from "react";
import { View, StyleSheet } from "react-native";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { auth } from "../config";

function closetScreen(props) {
  // I will use this for filtering or searching
  // const museums = query(collectionGroup(db, 'clothing'), where('type', '==', 'museum'));
  // const querySnapshot = await getDocs(museums);
  // querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  // });
  return <View style={styles.container}></View>;
}

const styles = StyleSheet.create({
  container: {},
});

export default closetScreen;
