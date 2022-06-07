import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Image, ScrollView } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";
import { useNavigation } from "@react-navigation/native";

import {
  collection,
  query,
  addDoc,
  getDocs,
  where,
  onSnapshot,
  serverTimestamp,
} from "firebase/firestore";

import { Formik, useFormikContext } from "formik";
import { auth, Colors, db } from "../config";
import { challengeSchema, responseSchema } from "../utils";

import {
  AppButton,
  AppCloseWindow,
  Error,
  LoadingIndicator,
  TextAreaFormField,
  View,
} from "../components";
import { OutfitItems } from "../components/responses";

export const CreateResponseScreen = ({ route }) => {
  const [response, setResponse] = useState("");
  const userUid = auth.currentUser.uid;
  const userName = auth.currentUser.displayName;
  const userAvatar = auth.currentUser.photoURL;
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();

  const handleCreateResponse = async (values) => {
    setIsLoading(true);
    console.log(values);
    await addDoc(collection(db, "responses"), {
      closetUid: route.params.closetUid,
      creatorUid: route.params.creatorUid,
      eventTitle: route.params.eventTitle,
      discription: values.discription,
      responderAvatar: userAvatar,
      responderUserName: userName,
      responderUid: userUid,
      challengeUid: route.params.challengeUid,
      createdAt: serverTimestamp(),
    })
      .then(navigation.popToTop(), setIsLoading(true))
      .catch((err) => setIsError(err.message));
  };

  return isError ? (
    <Error>{isError}</Error>
  ) : isLoading ? (
    <LoadingIndicator />
  ) : (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        <AppCloseWindow onPress={() => navigation.popToTop()} paddingSize={0} />
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            discription: "",
            chothingItems: [],
          }}
          validationSchema={responseSchema}
          onSubmit={(values, { resetForm }) => {
            handleCreateResponse(values);
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
              <Text style={{ marginTop: 50 }}>Add and items</Text>
              <OutfitItems
                name="chothingItems"
                closetUid={route.params.closetUid}
              />
              <Text style={{ marginTop: 20 }}>Tips and Trick</Text>
              <TextAreaFormField
                multiline
                numberOfLines={10}
                name="discription"
                placeholder="Start writing ..."
                value={values.discription}
                onChangeText={handleChange("discription")}
                onBlur={handleBlur("discription")}
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
  },

  Icon: {
    alignSelf: "flex-start",
  },
});
