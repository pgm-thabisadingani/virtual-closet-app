import { collection, deleteDoc, doc, where } from "firebase/firestore";
import React from "react";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { auth, Colors, db } from "../config";

export const ClothingItem = ({ navigation, items }) => {
  // console.log(items);
  const imageUri = items.imageUri;
  const closetOwerUid = items.closetOwerUid;
  const userUid = auth.currentUser.uid;

  //aAdd to the  cards list

  /**

 * challenge id 
 * chllenge creator id
 * responded id
 * navigation taking the id and image Uri to the challenge Responce card
 * remove item will also be there
 * take the category type too
 * []
 */

  //remove from the list

  const asyncDeleteItem = async (id) => {
    console.log(id);
    try {
      const request = await deleteDoc(doc(db, "clothing", id));
      console.log(request);
      navigation.popToTop();
    } catch (error) {
      console.log(error);
    }
  };

  // handle Select
  const handleSelect = () => {
    Alert.alert("Selected", "Are you sure you want to selete this image?", [
      { text: "Yes", onPress: () => console.log("select me" + items.id) },
      { text: "No" },
    ]);
  };

  // handle Delete
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this item?", [
      { text: "Yes", onPress: () => asyncDeleteItem(items.id) },
      { text: "No" },
    ]);
  };

  return (
    <>
      {userUid === closetOwerUid ? (
        <View>
          <Pressable style={styles.container} onLongPress={handleDelete}>
            <ImageBackground
              source={{ uri: imageUri }}
              resizeMode="cover"
              style={styles.image}
            ></ImageBackground>
          </Pressable>
        </View>
      ) : (
        <View>
          <Pressable style={styles.container} onPress={handleSelect}>
            <ImageBackground
              source={{ uri: imageUri }}
              resizeMode="cover"
              style={styles.image}
            ></ImageBackground>
          </Pressable>
        </View>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.lightGray,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    height: 200,
    width: 160,
    marginBottom: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
