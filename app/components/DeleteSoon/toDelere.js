import React, { useState, useEffect } from "react";
import { View, StyleSheet, FlatList, Modal } from "react-native";
import { useFormikContext, Field } from "formik";
import { FormErrorMessage } from "../FormErrorMessage";
import ImageInputList from "./ImageInputList";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { db } from "../../config";
import { AppCloseWindow } from "../AppCloseWindow";
import { LoadingIndicator } from "../LoadingIndicator";
import { Error } from "../Error";
import { Card, Checkbox, Title, Paragraph } from "react-native-paper";

export const OutfitItems = ({ name, closetUid }) => {
  const [items, setItems] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [modalVisible, setModalVisible] = useState(true);
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const [checkedItems, setCheckedItems] = useState([]);

  const isChecked = (id) => {
    return checkedItems.includes(id);
  };

  const toggleItem = (id) => {
    if (isChecked(id)) {
      setCheckedItems(checkedItems.filter((item) => item !== id));
    } else {
      setCheckedItems([...checkedItems, id]);
      setFieldValue([...checkedItems, id]);
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

  console.log(items);

  return (
    <>
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
                <ImageInputList
                  name={item.item.title}
                  value={item.imageUri}
                  status={isChecked(item.id) ? "checked" : "unchecked"}
                  onPress={() => toggleItem(item.id)}
                />
              )}
            />
          )}
        </View>
      </Modal>
      <FormErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
};

const styles = StyleSheet.create({
  container: {},
});

// +++++++++++++++++++++++++++++++++++++

import React, { useRef } from "react";
import { View, StyleSheet, Pressable } from "react-native";
import { Formik, Field } from "formik";
import ImageInput from "./ImageInput";
import { Card, Checkbox, Title, Paragraph, Avatar } from "react-native-paper";

function ImageInputList(props) {
  return (
    <View>
      <Pressable onPress={props.onPress}>
        <Card>
          <Card.Content style={styles.content}>
            <Checkbox status={props.status} />
            <View>
              <Title>{props.name}</Title>
            </View>
            <Avatar.Image size={150} source={{ uri: props.value }} />
          </Card.Content>
        </Card>
      </Pressable>
    </View>
  );
}

// const styles = StyleSheet.create({
//   container: {
//     flexDirection: "row",
//   },
//   image: {
//     marginRight: 10,
//   },
// });

// export default ImageInputList;
