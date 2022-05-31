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
import { auth, Colors } from "../config";

export const ClothingItem = ({ items }) => {
  console.log(items);
  const imageUri = items.imageUri;
  const closetOwerUid = items.closetOwerUid;
  const userUid = auth.currentUser.uid;

  //aAdd to the  cards list

  /**

 * challenge id 
 * chllenge creator id
 * responded id
 * navigation taking the id and image Uri
 * remove item will also be there
 * take the category type too
 * []
 */

  //remove from the list

  // handle Select
  const handleSelect = () => {
    Alert.alert("Selected", "Are you sure you want to  this image?", [
      { text: "Yes", onPress: () => console.log("select me" + items.item.id) },
      { text: "No" },
    ]);
  };

  // handle Delete
  const handleDelete = () => {
    Alert.alert("Delete", "Are you sure you want to delete this image?", [
      { text: "Yes", onPress: () => console.log("delete me " + items.item.id) },
      { text: "No" },
    ]);
  };

  return (
    <>
      {userUid !== closetOwerUid ? (
        <View>
          <Pressable style={styles.container} onPress={handleDelete}>
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
    borderColor: Colors.purple,
    borderWidth: 1,
    height: 160,
    width: 105,
    marginBottom: 20,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});
