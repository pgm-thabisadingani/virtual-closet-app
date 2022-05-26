import React from "react";
import { StyleSheet, Text } from "react-native";
import { collectionGroup, query, where, getDocs } from "firebase/firestore";
import { View, Icon } from "../components";
import { auth, Colors } from "../config";
import { AddImageItem } from "../components";
import { CategoryListItem, ChallengesListItem } from "../components/list";

export const ClosetScreen = ({ navigation }) => {
  // I will use this for filtering or searching
  // const museums = query(collectionGroup(db, 'clothing'), where('type', '==', 'museum'));
  // const querySnapshot = await getDocs(museums);
  // querySnapshot.forEach((doc) => {
  //     console.log(doc.id, ' => ', doc.data());
  // });
  return (
    <View isSafe style={styles.container}>
      <CategoryListItem
        name="pound"
        onPress={() => navigation.navigate("AddClothing")}
        title="Add item"
        color={Colors.gray}
      />
      <CategoryListItem
        name="pound"
        onPress=""
        title="Tops"
        color={Colors.gray}
      />
      <CategoryListItem
        name="pound"
        onPress=""
        title="Bottom"
        color={Colors.gray}
      />
      <CategoryListItem
        name="pound"
        onPress=""
        title="Shoes"
        color={Colors.gray}
      />
      <CategoryListItem
        name="pound"
        onPress=""
        title="Dress"
        color={Colors.gray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height: 50,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});
