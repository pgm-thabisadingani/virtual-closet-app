import React, { useState, useEffect } from "react";
import { StyleSheet, Text } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
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
  TextInput,
  Button,
  FormErrorMessage,
  Icon,
  AppButton,
  CategoryPickerItem,
  AppFormPicker,
} from "../components";
import { clothigItemSchema } from "../utils";
import { Formik } from "formik";

export const AddClothingItemScreen = ({ navigation, route }) => {
  const [category, setCategory] = useState([]);
  const closetID = route.params;
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
      closetOwerUid: userUid,
      closetUid: closetID,
      item: values.category,
    })
      .then(navigation.goBack())
      .catch((err) => console.error(err));
  };

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
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            category: null,
          }}
          validationSchema={clothigItemSchema}
          onSubmit={(values) => handleAddItem(values)}
        >
          {({
            values,
            touched,
            errors,
            handleChange,
            handleSubmit,
            handleBlur,
          }) => (
            <>
              {/* Input fields */}
              <FormErrorMessage error={errors.image} visible={touched.image} />
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
                title="Add Item"
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
});
