import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image } from "react-native";
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
  const [user, setUser] = useState("");
  const userUid = auth.currentUser.uid;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();

  /*getting user where === userUid*/
  const getUserAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(collection(db, "users"), where("uid", "==", userUid));
      onSnapshot(q, (snapshot) => {
        snapshot.forEach((doc) => {
          setUser({ ...doc.data(), id: doc.id });
        });
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  /*Keep track with changes in data add or delete. Clean up!*/
  useEffect(() => {
    const unsubscribe = getUserAsync();
    return () => unsubscribe;
  }, []);

  const userName = user.displayName;
  const userAvatar = user.photoURL;

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
