import React, { useState, useEffect } from "react";
import { Text, StyleSheet, Pressable } from "react-native";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  View,
  TextInput,
  Button,
  FormErrorMessage,
  Icon,
  AppButton,
} from "../components";
import { Images, Colors, auth, db } from "../config";
import { updateProfile } from "firebase/auth";
import { useTogglePasswordVisibility } from "../hooks";
import { signupValidationSchema } from "../utils";
import { addDoc, collection } from "firebase/firestore";

export const SignupScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");

  const {
    passwordVisibility,
    handlePasswordVisibility,
    rightIcon,
    handleConfirmPasswordVisibility,
    confirmPasswordIcon,
    confirmPasswordVisibility,
  } = useTogglePasswordVisibility();

  const handleSignup = async (values) => {
    const { username, email, password } = values;
    return createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        // Signed in
        await updateProfile(userCredential.user, {
          displayName: username,
          photoURL: "https://api.lorem.space/image/fashion?w=100&h=100",
          uid: userCredential.user.uid,
        });
        await addDoc(collection(db, "users"), {
          username: username,
          photoURL: userCredential.user.photoURL,
          email: userCredential.user.email,
          uid: userCredential.user.uid,
          firstName: "",
          lastName: "",
          age: null,
          street: "",
          houseNumber: null,
          city: "",
          zipCode: null,
          online: true,
          displayName: username,
        });
        await addDoc(collection(db, "closets"), {
          closetOwerUid: userCredential.user.uid,
        });
      })
      .then((e) => console.log("RES", { e }))
      .catch((err) => console.log("Err", { err }));
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* IconContainer: consits app icon back to welcome screen and screen title */}
        <View style={styles.iconContainer}>
          <Icon
            onPress={() => navigation.navigate("Login")}
            name="chevron-left"
            size={40}
            color={Colors.dark}
            style={styles.Icon}
          />
          <Text style={styles.screenTitle}>Create</Text>
          <Text style={styles.screenTitle}>Account</Text>
        </View>
        {/* Formik Wrapper */}
        <Formik
          initialValues={{
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
          }}
          validationSchema={signupValidationSchema}
          onSubmit={(values) => handleSignup(values)}
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
              <Text>Username</Text>
              <TextInput
                name="username"
                placeholder="janedoe"
                autoFocus={true}
                value={values.username}
                onChangeText={handleChange("username")}
                onBlur={handleBlur("username")}
              />
              <FormErrorMessage
                error={errors.username}
                visible={touched.username}
              />
              <Text>Email</Text>
              <TextInput
                name="email"
                placeholder="janedoe@email.com"
                autoCapitalize="none"
                keyboardType="email-address"
                textContentType="emailAddress"
                autoFocus={true}
                value={values.email}
                onChangeText={handleChange("email")}
                onBlur={handleBlur("email")}
              />
              <FormErrorMessage error={errors.email} visible={touched.email} />
              <Text>Password</Text>
              <TextInput
                name="password"
                placeholder="*************"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={passwordVisibility}
                textContentType="password"
                rightIcon={rightIcon}
                handlePasswordVisibility={handlePasswordVisibility}
                value={values.password}
                onChangeText={handleChange("password")}
                onBlur={handleBlur("password")}
              />
              <FormErrorMessage
                error={errors.password}
                visible={touched.password}
              />
              <Text>Confirm Password</Text>
              <TextInput
                name="confirmPassword"
                placeholder="*************"
                autoCapitalize="none"
                autoCorrect={false}
                secureTextEntry={confirmPasswordVisibility}
                textContentType="password"
                rightIcon={confirmPasswordIcon}
                handlePasswordVisibility={handleConfirmPasswordVisibility}
                value={values.confirmPassword}
                onChangeText={handleChange("confirmPassword")}
                onBlur={handleBlur("confirmPassword")}
              />
              <FormErrorMessage
                error={errors.confirmPassword}
                visible={touched.confirmPassword}
              />
              {/* Display Screen Error Mesages */}
              {errorState !== "" ? (
                <FormErrorMessage error={errorState} visible={true} />
              ) : null}
              {/* Signup button */}
              <AppButton
                size={20}
                textColor={Colors.white}
                title="Sign up"
                onPress={handleSubmit}
                color={Colors.purple}
              />
            </>
          )}
        </Formik>
        {/* Button to navigate to Login screen */}
        <Button
          style={styles.borderlessButtonContainer}
          borderless
          title={"Already have an account?"}
          onPress={() => navigation.navigate("Login")}
        />
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
  iconContainer: {
    alignItems: "center",
    alignItems: "flex-start",
    marginBottom: 40,
  },
  screenTitle: {
    fontSize: 30,
    fontWeight: "700",
    color: Colors.dark,
    paddingTop: 2,
    justifyContent: "flex-start",
  },
  borderlessButtonContainer: {
    marginTop: 10,
    alignItems: "flex-end",
  },
  Icon: {
    marginBottom: 10,
    marginLeft: -10,
  },
});
