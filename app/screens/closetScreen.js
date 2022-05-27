import React, { useState, useEffect } from "react";
import { StyleSheet, Text, FlatList } from "react-native";
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
import { CategoryListItem, ChallengesListItem } from "../components/list";

export const ClosetScreen = ({ navigation }) => {
  const [closet, setCloset] = useState();
  const userUid = auth.currentUser.uid;

  //getting closet where the the closet
  const setClosetAsync = async () => {
    const q = query(
      collection(db, "closets"),
      where("closetOwerUid", "==", userUid)
    );
    onSnapshot(q, (snapshot) => {
      if (snapshot.docs.length) {
        const results = snapshot.docs[0].data();
        setCloset((i) => ({ ...i, results }));
      }
    });
  };

  // Keep track wit the changes in data
  useEffect(() => {
    const unsubscribe = setClosetAsync();
    return () => unsubscribe;
  }, []);

  //creating a closet
  const createCloset = () => {
    addDoc(collection(db, "closets"), {
      closetOwerUid: userUid,
    }).catch((err) => console.error(err));
  };

  console.log(closet);

  return (
    <View isSafe style={styles.container}>
      {closet ? (
        <View>
          <View style={styles.categories}>
            {
              <CategoryListItem
                name="plus-circle"
                size={60}
                onPress={() => navigation.navigate("AddClothing")}
                title="Add item"
                color={Colors.lightGray}
              />
            }
            <View>
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
          </View>
          <Text>This is the closet of {auth.currentUser.displayName}</Text>
        </View>
      ) : (
        <View style={styles.createCloset}>
          <Text>Let's start by creating a closet </Text>
          <AppButton
            color={Colors.lightPurple}
            textColor={Colors.white}
            buttonWidth={200}
            title="Create Closet"
            onPress={createCloset}
          />
        </View>
      )}
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
