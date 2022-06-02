import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { collection, query, addDoc, onSnapshot } from "firebase/firestore";

import { auth, Colors, db } from "../../config";

import { Formik } from "formik";
import { challengeSchema } from "../../utils";
import { AppButton } from "../AppButton";
import { View } from "../View";
import { TextInput } from "../TextInput";
import { FormErrorMessage } from "../FormErrorMessage";

export const AddChallenge = () => {
  const userUid = auth.currentUser.uid;
  const userName = auth.currentUser.displayName;
  const userAvatar = auth.currentUser.photoURL;
  const navigation = useNavigation();

  /*creating a clothing Item */
  const handleAddItem = async (values) => {
    addDoc(collection(db, "challenges"), {
      creatorUid: userUid,
      creatorUserName: userName,
      creatorAvator: userAvatar,
      eventTitle: values.eventTitle,
      eventDate: values.eventDate,
      discription: values.discription,
    })
      .then(navigation.popToTop())
      .catch((err) => console.error(err));
  };
  return (
    <View style={styles.container}>
      {/* Formik Wrapper */}
      <Formik
        initialValues={{
          eventTitle: "",
          eventDate: null,
          discription: "",
        }}
        validationSchema={challengeSchema}
        onSubmit={(values) => handleAddItem(values)}
        // onSubmit={(values, { setSubmitting }) => {
        //   setTimeout(() => {
        //     alert(JSON.stringify(values, null, 2));
        //     setSubmitting(false);
        //   }, 500);
        // }}
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
            <Text>Event Title</Text>
            <TextInput
              name="eventTitle"
              placeholder="First date"
              autoFocus={true}
              value={values.eventTitle}
              onChangeText={handleChange("eventTitle")}
              onBlur={handleBlur("eventTitle")}
            />
            <FormErrorMessage
              error={errors.eventTitle}
              visible={touched.eventTitle}
            />
            <DatePickerField name="eventDate" />

            <Text>Event Discription</Text>
            <TextInput
              multiline
              numberOfLines={10}
              name="discription"
              placeholder="Start writing ..."
              autoFocus={true}
              value={values.username}
              onChangeText={handleChange("discription")}
              onBlur={handleBlur("discription")}
            />
            <FormErrorMessage
              error={errors.eventDate}
              visible={touched.eventDate}
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },

  Icon: {
    alignSelf: "flex-start",
  },
});
