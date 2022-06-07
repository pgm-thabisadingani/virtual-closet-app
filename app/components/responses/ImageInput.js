import React, { useEffect, useState } from "react";
import {
  View,
  StyleSheet,
  Image,
  Pressable,
  Alert,
  Modal,
  FlatList,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { Colors, db } from "../../config";
import { useNavigation } from "@react-navigation/native";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { LoadingIndicator } from "../LoadingIndicator";
import { Error } from "../Error";
import { AppCloseWindow } from "../AppCloseWindow";

function ImageInput({ imageUri, onChangeImage, closetUid }) {
  const [modalVisible, setModalVisible] = useState(false);
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [checkedItems, setCheckedItems] = useState([]);

  const isChecked = (id) => {
    return checkedItems.includes(id);
  };

  const handlePress = () => {
    if ("hey") {
      ("you have made it");
    } else
      Alert.alert("Delete", "Are you sure you want to delete this image?", [
        { text: "Yes", onPress: () => onChangeImage(null) },
        { text: "No" },
      ]);
  };

  const selectImage = async (id) => {
    setModalVisible(true);
    try {
    } catch (error) {
      console.log("Error reading an image", error);
    }
  };

  //getting items where closetceator Uid == userUid
  const getClosetAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "clothing"),
        where("closetUid", "==", closetUid)
      );
      onSnapshot(q, (snapshot) => {
        let results = [];
        snapshot.forEach((doc) => {
          results.push({ ...doc.data(), id: doc.id });
        });
        setItems(results);
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  // Keep track with changes in data add or delete. Clean up!
  useEffect(() => {
    const unsubscribe = getClosetAsync();
    return () => unsubscribe;
  }, []);

  console.log(items.length);

  return (
    <Pressable onPress={handlePress}>
      <View style={styles.container}>
        {!imageUri && (
          <MaterialCommunityIcons
            color={Colors.lightGray}
            name="camera"
            size={40}
          />
        )}
        {imageUri && <Image source={{ uri: imageUri }} style={styles.image} />}
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <View>
          <AppCloseWindow
            onPress={() => setModalVisible(false)}
            paddingSize={10}
          />
          {isError ? (
            <Error>{isError}</Error>
          ) : isLoading || !items ? (
            <LoadingIndicator />
          ) : (
            <FlatList
              data={items}
              keyExtractor={(item) => item.id.toString()} // returns a number which you have to conver to string
              numColumns={2}
              renderItem={({ item }) => (
                <PickerItemComponent
                  item={item}
                  label={item.label}
                  onPress={() => {
                    onSelectItem(item);
                  }}
                />
              )}
            />
          )}
        </View>
      </Modal>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    backgroundColor: Colors.light,
    borderRadius: 15,
    height: 100,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 100,
  },
  image: {
    height: "100%",
    width: "100%",
  },
});

export default ImageInput;
