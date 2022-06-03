import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import { collection, query, addDoc, getDocs, where } from "firebase/firestore";

import { Formik, useFormikContext } from "formik";
import { auth, Colors, db } from "../config";
import { challengeSchema } from "../utils";

import {
  AppButton,
  AppDatePicker,
  Error,
  FormErrorMessage,
  LoadingIndicator,
  LocationPicker,
  TextAreaFormField,
  TextInput,
  View,
} from "../components";

export const CreateChallengeScreen = () => {
  const [closet, setCloset] = useState("");
  const userUid = auth.currentUser.uid;
  const userName = auth.currentUser.displayName;
  const userAvatar = auth.currentUser.photoURL;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();

  /*getting closet where the the closet*/
  const getClosetAsync = async () => {
    setIsLoading(true);
    try {
      const q = query(
        collection(db, "closets"),
        where("closetOwerUid", "==", userUid)
      );

      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        setCloset({ ...doc.data(), id: doc.id });
        setIsLoading(false);
      });
    } catch (error) {
      setIsError(error.message);
    }
  };

  useEffect(() => {
    const unsubscribe = getClosetAsync();
    return () => unsubscribe;
  }, []);

  /*creating a clothing Item */
  const handleAddItem = async (values) => {
    setIsLoading(true);
    addDoc(collection(db, "challenges"), {
      closetUid: closet.id,
      creatorUid: userUid,
      creatorUserName: userName,
      creatorAvator: userAvatar,
      eventTitle: values.eventTitle,
      eventLocation: values.eventLocation,
      eventDate: values.eventDate,
      discription: values.discription,
    })
      .then(navigation.navigate("Challenges"), setIsLoading(false))
      .catch((err) => setIsError(err.message), setIsLoading(false));
  };
  return isError ? (
    <Error>{isError}</Error>
  ) : isLoading || !closet ? (
    <LoadingIndicator />
  ) : (
    <View isSafe style={styles.container} listMode="SCROLLVIEW">
      {/* Formik Wrapper */}
      <Formik
        initialValues={{
          eventTitle: "",
          discription: "",
          eventDate: null,
          eventLocation: null,
        }}
        validationSchema={challengeSchema}
        onSubmit={(values, { resetForm }) => {
          handleAddItem(values);
          resetForm({ values: " " });
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
            <View
              style={{
                flex: 1,
                width: "100%",
                position: "absolute",
                zIndex: 100,
                right: 25,
                top: 25,
              }}
            >
              <LocationPicker name="eventLocation" autoFocus={true} />
            </View>
            <ScrollView
              listMode="SCROLLVIEW"
              style={{ flex: 1, marginTop: 115 }}
            >
              <Text>Pick a date</Text>
              <AppDatePicker name="eventDate" />
              <Text>Event Title</Text>
              <TextInput
                name="eventTitle"
                placeholder="Funeral"
                value={values.eventTitle}
                onChangeText={handleChange("eventTitle")}
                onBlur={handleBlur("eventTitle")}
              />
              <FormErrorMessage
                error={errors.eventTitle}
                visible={touched.eventTitle}
              />
              <Text style={{ marginTop: 20 }}>Event Discription</Text>
              <TextAreaFormField
                multiline
                numberOfLines={10}
                name="discription"
                placeholder="Start writing ..."
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
            </ScrollView>
          </>
        )}
      </Formik>
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
