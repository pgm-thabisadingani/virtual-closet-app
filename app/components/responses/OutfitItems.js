import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  Modal,
  Image,
  Pressable,
  ImageBackground,
} from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useFormikContext, Field } from "formik";
import { FormErrorMessage } from "../FormErrorMessage";
import ImageInputList from "./ImageInputList";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { Colors, db } from "../../config";
import { AppCloseWindow } from "../AppCloseWindow";
import { LoadingIndicator } from "../LoadingIndicator";
import { Error } from "../Error";
import { Icon } from "../Icon";
import { EmptyView } from "../EmptyView";

export const OutfitItems = ({ name, closetUid }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const [checkedItems, setCheckedItems] = useState([]);

  const isChecked = (imageUri) => {
    return checkedItems.includes(imageUri);
  };

  const toggleItem = (imageUri) => {
    if (isChecked(imageUri)) {
      setCheckedItems(checkedItems.filter((item) => item !== imageUri));
    } else {
      setCheckedItems([...checkedItems, imageUri]);
      setFieldValue(name, [...checkedItems, imageUri]);
    }
  };

  console.log(checkedItems);

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

  console.log(items);

  return (
    <>
      <View style={styles.container}>
        <FlatList
          data={checkedItems}
          keyExtractor={(item) => item.toString()} // returns a number which you have to conver to string
          numColumns={2}
          renderItem={({ item }) => (
            <Pressable onPress={() => setModalVisible(true)}>
              <ImageBackground
                source={{ uri: item }}
                resizeMode="cover"
                style={{
                  height: 150,
                  width: 150,
                  margin: 10,
                  borderRadius: 15,
                  overflow: "hidden",
                }}
              ></ImageBackground>
            </Pressable>
          )}
        />
        <Icon
          name="plus-circle"
          size={80}
          onPress={() => setModalVisible(true)}
          color={Colors.lightGray}
        />
      </View>
      <Modal visible={modalVisible} animationType="slide">
        <AppCloseWindow
          onPress={() => setModalVisible(false)}
          paddingSize={30}
        />
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View role="group" aria-labelledby="checkbox-group">
            {isLoading ? (
              <LoadingIndicator />
            ) : isError || !items.length ? (
              <>
                <Error />
                <EmptyView
                  message="The closet of this users is currently empty."
                  marginSize={150}
                />
              </>
            ) : (
              <FlatList
                data={items}
                keyExtractor={(item) => item.id.toString()} // returns a number which you have to conver to string
                numColumns={2}
                renderItem={({ item }) => (
                  <ImageInputList
                    name={item.item.title}
                    value={item.imageUri}
                    status={isChecked(item.imageUri) ? "checked" : "unchecked"}
                    onPress={() => toggleItem(item.imageUri)}
                  />
                )}
              />
            )}
          </View>
        </KeyboardAwareScrollView>
      </Modal>
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 15,
    borderColor: Colors.light,
    padding: 2,
    borderWidth: 1,
    marginTop: 15,
    marginBottom: 20,
  },
});
