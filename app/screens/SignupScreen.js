import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { View, TextInput, Button, FormErrorMessage, Icon } from "../components";
import { Images, Colors, auth } from "../config";
import { updateProfile } from "firebase/auth";
import { useTogglePasswordVisibility } from "../hooks";
import { signupValidationSchema } from "../utils";

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

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {
          displayName: username,
          photoURL: "https://api.lorem.space/image/fashion?w=100&h=100",
        })
          .then(() => {
            // Profile updated!
            // ...
            console.log("Profile updated!");
          })
          .catch((error) => {
            // An error occurred
            console.log(error);
          });

        // ...
      })

      .catch((error) => setErrorState(error.message));
  };

  return (
    <View isSafe style={styles.container}>
      <KeyboardAwareScrollView enableOnAndroid={true}>
        {/* IconContainer: consits app icon back to welcome screen and screen title */}
        <View style={styles.iconContainer}>
          <Icon
            onPress={() => navigation.navigate("Welcome")}
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
              <Button style={styles.button} onPress={handleSubmit}>
                <Text style={styles.buttonText}>Sign up</Text>
              </Button>
            </>
          )}
        </Formik>
        {/* Button to navigate to Login screen */}
        <Text style={styles.optionText}>Or</Text>
        <Button
          style={styles.buttonSignIn}
          onPress={() => navigation.navigate("Login")}
        >
          <Text style={styles.buttonTextSignIn}>Sign In</Text>
        </Button>
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
  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
    backgroundColor: Colors.purple,
    padding: 10,
    borderRadius: 25,
  },
  buttonSignIn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: Colors.white,
    padding: 10,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: Colors.purple,
  },
  buttonTextSignIn: {
    fontSize: 20,
    color: Colors.purple,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  borderlessButtonContainer: {
    marginTop: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  Icon: {
    marginBottom: 10,
    marginLeft: -10,
  },
  optionText: {
    textAlign: "center",
    marginTop: 10,
    marginBottom: 5,
    fontWeight: "700",
  },
});
