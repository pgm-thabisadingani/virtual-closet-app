import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { collection, query, addDoc, onSnapshot } from "firebase/firestore";

import { auth, Colors, db } from "../../config";

import { Formik } from "formik";
import { clothingItemSchema } from "../../utils";
import { AppFormPicker } from "../AppFormPicker";
import { AppButton } from "../AppButton";
import { CategoryPickerItem } from "../CategoryPickerItem";
import { View } from "../View";

export const AddClothingItem = ({ closetUid, imageUri }) => {
  const [category, setCategory] = useState([]);
  const userUid = auth.currentUser.uid;
  const navigation = useNavigation();

  /*get all the categories*/
  const getCategoriesAsync = async () => {
    const q = query(collection(db, "categories"));
    onSnapshot(q, (snapshot) => {
      setCategory(snapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    });
  };

  useEffect(() => {
    const unsubscribe = getCategoriesAsync();
    return () => unsubscribe;
  }, []);

  /*creating a clothing Item */
  const handleAddItem = async (values) => {
    addDoc(collection(db, "clothing"), {
      closetOwerUid: values.closetOwerUid,
      closetUid: values.closetUid,
      imageUri: values.imageUri,
      item: values.category,
    })
      .then(navigation.popToTop())
      .catch((err) => console.error(err));
  };

  // navigation.PopToTop takes to back to the first screen

  return (
    <View style={styles.container}>
      {/* Formik Wrapper */}
      <Formik
        initialValues={{
          closetOwerUid: userUid,
          closetUid: closetUid,
          imageUri: imageUri,
          category: null,
        }}
        validationSchema={clothingItemSchema}
        onSubmit={(values) => handleAddItem(values)}
      >
        {({ handleSubmit }) => (
          <>
            {/* Input fields */}
            <AppFormPicker
              items={category}
              name="category"
              PickerItemComponent={CategoryPickerItem}
              placeholder="Category"
              width="100%"
              numberOfColumns={3}
            />
            <View style={{ marginTop: 20 }}>
              <AppButton
                size={20}
                textColor={Colors.white}
                title="Add To Closet"
                onPress={handleSubmit}
                color={Colors.purple}
              />
            </View>
          </>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
    backgroundColor: Colors.dark,
    height: 430,
  },

  Icon: {
    alignSelf: "flex-start",
  },
});
