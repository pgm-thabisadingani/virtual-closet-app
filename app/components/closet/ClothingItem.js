import { collection, deleteDoc, doc, where } from "firebase/firestore";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  View,
  StyleSheet,
  Text,
  ImageBackground,
  Image,
  Pressable,
  Alert,
} from "react-native";
import { auth, Colors, db } from "../../config";

export const ClothingItem = ({ items }) => {
  const navigation = useNavigation();

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
    try {
      const request = await deleteDoc(doc(db, "clothing", id));
      navigation.popToTop();
    } catch (error) {
      console.log(error);
    }
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
      <View>
        <Pressable style={styles.container} onLongPress={handleDelete}>
          <ImageBackground
            source={{ uri: imageUri }}
            resizeMode="cover"
            style={styles.image}
          ></ImageBackground>
        </Pressable>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    borderColor: Colors.lightGray,
    borderRadius: 15,
    overflow: "hidden",
    borderWidth: 1,
    height: 200,
    width: 152,
    margin: 5,

    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
