import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList } from "react-native";
import { v4 as uuid } from "uuid";
import "react-native-get-random-values";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import { View, Icon, AppButton } from "../components";
import { auth, Colors, database, db } from "../config";
import { AddImageItem } from "../components";
import { CategoryListItem, ClothingListItems } from "../components/list";

export const ClosetScreen = ({ navigation }) => {
  const [closet, setCloset] = useState("");
  const [category, setCategory] = useState("");
  const userUid = auth.currentUser.uid;

  /*getting closet where the the closet*/
  const setClosetAsync = async () => {
    const q = query(
      collection(db, "closets"),
      where("closetOwerUid", "==", userUid)
    );

    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      setCloset({ ...doc.data(), id: doc.id });
    });
  };

  /*filter base on categories*/

  /*Keep track with changes in data add or delete. Clean up!*/

  useEffect(() => {
    const unsubscribe = setClosetAsync();
    return () => unsubscribe;
  }, []);

  console.log(closet);
  return (
    <View isSafe style={styles.container}>
      <View>
        <View style={styles.categories}>
          {closet.closetOwerUid === userUid ? (
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-between",
              }}
            >
              <View style={{ alignItems: "center" }}>
                <Icon
                  name="plus-circle"
                  size={100}
                  onPress={() =>
                    navigation.navigate("SaveItemImage", {
                      closetOwerId: closet.closetOwerUid,
                      closetId: closet.id,
                    })
                  }
                  color={Colors.lightGray}
                />
                <Text>Add Item</Text>
              </View>
              <Icon
                name="plus-circle"
                size={100}
                onPress={() =>
                  navigation.navigate("SaveItemGooleAi", {
                    closetOwerId: closet.closetOwerUid,
                    closetId: closet.id,
                  })
                }
                color={Colors.lightPurple}
              />
            </View>
          ) : (
            <Text></Text>
          )}
          <CategoryListItem userUid={userUid} />
        </View>
        <Text>This is the closet of {auth.currentUser.displayName}</Text>
        <ClothingListItems />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    flex: 1,
  },
  createCloset: {
    paddingVertical: "70%",
    justifyContent: "center",
    alignItems: "center",
  },
});
