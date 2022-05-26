import React from "react";
import { StyleSheet, Text } from "react-native";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { View, Icon } from "../components";
import { auth, Colors } from "../config";
import { AddImageItem } from "../components";

export const AddClothingItemScreen = ({ navigation }) => {
  // I will use this for filtering or searching
  // const museums = query(collectionGroup(db, 'clothing'), where('type', '==', 'museum'));
  // const querySnapshot = await getDocs(museums);
  // querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  // });
  return (
    <View isSafe style={styles.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="chevron-left"
        size={40}
        color={Colors.dark}
        style={styles.Icon}
      />
      <AddImageItem />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
