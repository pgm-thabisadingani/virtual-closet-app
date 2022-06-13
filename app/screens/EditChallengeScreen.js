import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  query,
  where,
  onSnapshot,
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
} from "firebase/firestore";

import { Formik } from "formik";
import { auth, Colors, db } from "../config";
import { challengeUpdateSchema } from "../utils";

import {
  AppButton,
  AppDatePicker,
  Error,
  FormErrorMessage,
  LoadingIndicator,
  AppLocationPicker,
  TextAreaFormField,
  TextInput,
  View,
} from "../components";

export const EditChallengeScreen = ({ route }) => {
  const [challenge, setChallenge] = useState([]);
  const [user, setUser] = useState([]);
  const userUid = auth.currentUser.uid;
  const challengeUid = route.params;
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

  /*getting challenges by doc id */
  const getChallengeAsync = async () => {
    setIsLoading(true);
    const q = await getDoc(doc(db, "challenges", challengeUid));
    if (q.exists()) {
      setChallenge(q.data());
      setIsLoading(false);
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
      setIsError(true);
    }
  };

  useEffect(() => {
    const unsubscribe = getChallengeAsync();
    return () => unsubscribe;
  }, []);

  const getEnddate = (value) => {
    if (!value === null) {
      let newDate = value.eventDate.toLocaleDateString();
      let endDate = Date.parse(newDate);
      return endDate;
    } else {
      let endDate = challenge.eventDate;
      return endDate;
    }
  };
  console.log(challenge);

  /* function to update profile in firestore */
  const handleUpdate = async (values) => {
    console.log(values);

    let endDate = getEnddate(values.eventDate);

    updateDoc(doc(db, "challenges", challengeUid), {
      creatorUserName: user.username,
      creatorAvator: user.photoURL,
      eventTitle: values.eventTitle || challenge.eventTitle,
      eventLocation: values.eventLocation || challenge.eventLocation,
      eventDate: endDate || challenge.eventDate,
      discription: values.discription || challenge.discription,
      createdAt: serverTimestamp(),
    })
      .then(
        console.log("Challenge is updated"),
        navigation.navigate("Challenge Details", challengeUid)
      )
      .catch((err) => console.error(err));
  };

  return (
    <View isSafe style={styles.container} listMode="SCROLLVIEW">
      {/* Formik Wrapper */}
      <Formik
        initialValues={{
          eventTitle: "",
          discription: "",
          eventDate: null,
          eventLocation: null,
        }}
        validationSchema={challengeUpdateSchema}
        onSubmit={(values, { resetForm }) => {
          handleUpdate(values);
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
              <AppLocationPicker name="eventLocation" autoFocus={true} />
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
                placeholder={challenge.eventTitle}
                value={values.eventTitle}
                onChangeText={handleChange("eventTitle")}
                onBlur={handleBlur("eventTitle")}
              />
              <FormErrorMessage
                error={errors.eventTitle}
                visible={touched.eventTitle}
              />
              <Text style={{ marginTop: 20 }}>Look and event discription</Text>
              <TextAreaFormField
                multiline
                numberOfLines={10}
                name="discription"
                placeholder={challenge.discription}
                value={values.discription}
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
