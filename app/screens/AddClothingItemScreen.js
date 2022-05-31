import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { v4 as uuid } from "uuid";
import "react-native-get-random-values";
import {
  collection,
  query,
  where,
  getDocs,
  addDoc,
  onSnapshot,
} from "firebase/firestore";

import { auth, Colors, db } from "../config";
import {
  View,
  Icon,
  AppButton,
  CategoryPickerItem,
  AppFormPicker,
} from "../components";
import { clothigItemSchema } from "../utils";
import { Formik } from "formik";

export const AddClothingItemScreen = ({ navigation, route }) => {
  const [category, setCategory] = useState([]);
  const imageUri = route.params.imageUrl;
  const userUid = auth.currentUser.uid;

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
      itemUid: values.itemUid,
      closetOwerUid: values.closetOwerUid,
      imageUri: values.imageUri,
      item: values.category,
    })
      .then(navigation.popToTop())
      .catch((err) => console.error(err));
  };

  console.log(imageUri);

  // navigation.PopToTop takes to back to the first screen

  return (
    <View isSafe style={styles.container}>
      <Icon
        onPress={() => navigation.goBack()}
        name="chevron-left"
        size={40}
        color={Colors.dark}
        style={styles.Icon}
      />
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <View style={styles.imagePreview}>
          <Image source={{ uri: imageUri }} style={styles.image} />
        </View>
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            closetOwerUid: userUid,
            imageUri: imageUri,
            category: null,
          }}
          validationSchema={clothigItemSchema}
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
                width="50%"
                numberOfColumns={3}
              />
              <AppButton
                buttonWidth={150}
                size={20}
                textColor={Colors.white}
                title="Add To Closet"
                onPress={handleSubmit}
                color={Colors.purple}
              />
            </>
          )}
        </Formik>
      </KeyboardAwareScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  imagePreview: {
    alignItems: "center",
    backgroundColor: Colors.light,
    borderRadius: 15,
    height: 200,
    justifyContent: "center",
    marginVertical: 10,
    overflow: "hidden",
    width: 200,
    paddingVertical: 15,
  },
  image: {
    height: "100%",
    width: "100%",
  },
  Icon: {
    alignSelf: "flex-start",
  },
});
