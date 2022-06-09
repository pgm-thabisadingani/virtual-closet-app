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
  getFirestore,
  onSnapshot,
  addDoc,
} from "firebase/firestore";
import {
  View,
  Icon,
  AppButton,
  AppCloseWindow,
  LoadingIndicator,
  Error,
} from "../components";
import { auth, Colors, db, FontSizes } from "../config";
import { CategoryListItem } from "../components/categoryList";
import { ClothingListItems } from "../components/closet";

export const ClosetScreen = ({ navigation }) => {
  const [closet, setCloset] = useState("");
  const [category, setCategory] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [show, setShow] = useState(false);
  const userUid = auth.currentUser.uid;

  /*getting closet where the the closet*/
  const getClosetAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "closets"),
        where("closetOwerUid", "==", userUid)
      );
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setCloset({ ...doc.data(), id: doc.id });
        });
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  /*filter base on categories*/

  /*Keep track with changes in data add or delete. Clean up!*/
  useEffect(() => {
    const unsubscribe = getClosetAsync();
    return () => unsubscribe;
  }, []);

  console.log(closet);
  return isLoading ? (
    <LoadingIndicator />
  ) : isError ? (
    <Error />
  ) : (
    <View isSafe style={styles.container}>
      <View style={styles.categories}>
        {closet.closetOwerUid === userUid && (
          <View style={{ alignItems: "center", width: 100 }}>
            <Icon
              name="plus-circle"
              size={80}
              onPress={() => setShow(true)}
              color={Colors.lightGray}
            />
            <Text>Add Item</Text>
          </View>
        )}
        <CategoryListItem userUid={userUid} />
      </View>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <RNView style={styles.clothigList}>
          <ClothingListItems />
        </RNView>
      </KeyboardAwareScrollView>
      {show ? (
        <View style={styles.addImageContainer}>
          <View style={styles.addButtonWrapper}>
            <AppCloseWindow onPress={() => setShow(false)} paddingSize={20} />
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
                        goingTo: "clothing",
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
                        goingTo: "clothing",
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
    padding: 0,
    zIndex: 100,
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
