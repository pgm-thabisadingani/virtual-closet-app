import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  FlatList,
  ImageBackground,
  Modal,
  View as RNView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from "react-native";

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
  const [categoryFilter, setCategoryFilter] = useState(" ");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const userUid = auth.currentUser.uid;

  // get all the Categories from database
  const setChallengesAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "categories"));
      onSnapshot(q, (snapshot) => {
        setCategory(
          snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }))
        );
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = setChallengesAsync();
    return () => unsubscribe;
  }, []);

  console.log(categoryFilter);

  let screenWidth = Dimensions.get("window").width;

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

  return isLoading ? (
    <LoadingIndicator />
  ) : isError ? (
    <Error />
  ) : (
    <View style={styles.container}>
      <View style={styles.categories}>
        <ScrollView
          style={styles.categoryWrapper}
          horizontal={true}
          pagingEnabled={true}
          showsHorizontalScrollIndicator={false}
        >
          <View style={[styles.wrapperSt, { width: screenWidth }]}>
            <View style={styles.filter}>
              <TouchableOpacity onPress={() => setCategoryFilter(" ")}>
                <Text style={styles.categoryTitle}>All</Text>
              </TouchableOpacity>
            </View>
            <FlatList
              data={category}
              keyExtractor={(item) => item.id} // returns a number which you have to conver to string
              numColumns={5}
              renderItem={({ item }) => (
                <View style={styles.filter}>
                  <TouchableOpacity
                    onPress={() => setCategoryFilter(item.title)}
                  >
                    <Text style={styles.categoryTitle}>{item.title}</Text>
                  </TouchableOpacity>
                </View>
              )}
            />
          </View>
        </ScrollView>
      </View>
      <View style={styles.createIconWrapper}>
        <Icon
          name="plus-circle"
          size={100}
          onPress={() => setModalVisible(true)}
          color={Colors.purple}
          style={styles.createIcon}
        />
      </View>

      <View isSafe style={styles.clothigList}>
        <ClothingListItems category={categoryFilter} />
      </View>

      <Modal visible={modalVisible} animationType="slide">
        <View style={styles.addImageContainer}>
          <View style={styles.addButtonWrapper}>
            <AppCloseWindow
              onPress={() => setModalVisible(false)}
              paddingSize={20}
            />
            <View style={styles.options}>
              <View style={styles.icon}>
                <Icon
                  name="camera"
                  size={100}
                  onPress={() =>
                    navigation.navigate(
                      "SaveItemImage",
                      {
                        closetOwerId: closet.closetOwerUid,
                        closetId: closet.id,
                        goingTo: "clothing",
                      },
                      setModalVisible(false)
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
                  Add manually
                </Text>
              </View>
              <View style={styles.icon}>
                <Icon
                  name="snail"
                  size={100}
                  onPress={() =>
                    navigation.navigate(
                      "SaveItemGoogleAi",
                      {
                        closetOwerId: closet.closetOwerUid,
                        closetId: closet.id,
                        goingTo: "clothing",
                      },
                      setModalVisible(false)
                    )
                  }
                  color={Colors.midLight}
                />
                <Text
                  style={{ fontSize: FontSizes.body, color: Colors.midLight }}
                >
                  Use Google Ai
                </Text>
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  listContainer: {},
  clothigList: {
    flex: 1,

    padding: 0,
  },
  addImageContainer: {
    flex: 1,
    backgroundColor: " rgba(0, 0, 0, 0.8)",

    justifyContent: "center",
    alignItems: "center",
    padding: 0,
  },
  addButtonWrapper: {
    height: 420,
    width: 350,
    backgroundColor: Colors.white,
    borderRadius: 15,
  },
  createIconWrapper: {
    alignItems: "center",
    position: "absolute",
    bottom: 20,
    right: 0,
    zIndex: 100,
  },
  options: {
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-between",
    marginTop: 10,
  },
  icon: {
    padding: 20,
    alignItems: "center",
    fontSize: 18,
  },
  categories: {},
  categoryWrapper: {
    marginVertical: 10,
  },
  wrapperSt: {
    flexDirection: "row",
  },
  filter: {
    backgroundColor: Colors.purple,

    paddingHorizontal: 20,
    paddingVertical: 5,
    marginHorizontal: 5,
    borderRadius: 15,
    overflow: "hidden",
    alignItems: "center",
  },
  categoryTitle: {
    textTransform: "capitalize",
    backgroundColor: Colors.purple,
    fontSize: FontSizes.body,
    fontWeight: "700",
    color: Colors.white,
  },
});
