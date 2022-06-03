import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
  ScrollView,
  View as RNView,
} from "react-native";
import { v4 as uuid } from "uuid";
import "react-native-get-random-values";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

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
import { auth, Colors, database, db, FontSizes } from "../config";
import { AddImageItem } from "../components";
import { CategoryListItem, ClothingListItems } from "../components/list";

export const ClosetScreen = ({ navigation }) => {
  const [closet, setCloset] = useState("");
  const [category, setCategory] = useState("");
  const [show, setShow] = useState(false);
  const userUid = auth.currentUser.uid;

  /*getting closet where the the closet*/
  const getClosetAsync = async () => {
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
    const unsubscribe = getClosetAsync();
    return () => unsubscribe;
  }, []);

  console.log(closet);
  return (
    <View isSafe style={styles.container}>
      <View style={styles.categories}>
        {closet.closetOwerUid === userUid && (
          <RNView style={{ alignItems: "center", width: 100 }}>
            <Icon
              name="plus-circle"
              size={80}
              onPress={() => setShow(true)}
              color={Colors.lightGray}
            />
            <Text>Add Item</Text>
          </RNView>
        )}
        <CategoryListItem userUid={userUid} />
      </View>
      <RNView style={styles.clothigList}>
        <ClothingListItems />
      </RNView>
      {show ? (
        <View style={styles.addImageContainer}>
          <View style={styles.addButtonWrapper}>
            <View style={{ alignItems: "flex-end", padding: 20 }}>
              <Icon
                name="window-close"
                size={30}
                color={Colors.mediumGray}
                onPress={() => setShow(false)}
              />
            </View>
            <View style={styles.options}>
              <View style={styles.icon}>
                <Icon
                  name="plus-circle"
                  size={100}
                  onPress={() =>
                    navigation.navigate(
                      "SaveItemImage",
                      {
                        closetOwerId: closet.closetOwerUid,
                        closetId: closet.id,
                      },
                      setShow(false)
                    )
                  }
                  color={Colors.lightPurple}
                />
                <Text
                  style={{
                    fontSize: FontSizes.body,
                    color: Colors.lightPurple,
                  }}
                >
                  Manual
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="plus-circle"
                  size={100}
                  onPress={() =>
                    navigation.navigate(
                      "SaveItemGooleAi",
                      {
                        closetOwerId: closet.closetOwerUid,
                        closetId: closet.id,
                      },
                      setShow(false)
                    )
                  }
                  color={Colors.lightGray}
                />
                <Text style={{ fontSize: FontSizes.body, color: Colors.gray }}>
                  Google Ai
                </Text>
              </View>
            </View>
          </View>
        </View>
      ) : null}
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
  clothigList: {
    marginRight: -20,
  },
  addImageContainer: {
    position: "absolute",
    backgroundColor: " rgba(0, 0, 0, 0.8)",
    height: "110%",
    width: "115%",
    justifyContent: "center",
    alignItems: "center",
    marginRight: -20,
    padding: 0,
  },
  addButtonWrapper: {
    height: 320,
    width: 320,
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  options: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
  icon: {
    marginTop: 50,
    padding: 20,
    alignItems: "center",
    fontSize: 18,
  },
});
