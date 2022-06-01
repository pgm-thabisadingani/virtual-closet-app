import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { collection, query, addDoc, onSnapshot } from "firebase/firestore";

import { Formik } from "formik";

import { auth, Colors, db } from "../config";

import { challengeSchema } from "../utils";

import {
  AppButton,
  DatePickerField,
  FormErrorMessage,
  LocationPicker,
  TextAreaFormField,
  TextInput,
  View,
} from "../components";

export const CreateChallengeScreen = () => {
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
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            eventTitle: "",
            discription: "",
            eventDate: null,
          }}
          validationSchema={challengeSchema}
          // onSubmit={(values) => handleAddItem(values)}
          onSubmit={(values, { setSubmitting }) => {
            setTimeout(() => {
              alert(JSON.stringify(values, null, 2));
              setSubmitting(false);
            }, 500);
          }}
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
                placeholder="Funeral"
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
              <TextAreaFormField
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
                title="Submit"
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
    backgroundColor: Colors.white,
    paddingTop: 40,
  },

  Icon: {
    alignSelf: "flex-start",
  },
});
