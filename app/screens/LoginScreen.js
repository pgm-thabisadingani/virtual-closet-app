import React, { useState } from "react";
import { Text, StyleSheet } from "react-native";
import { Formik } from "formik";
import { signInWithEmailAndPassword } from "firebase/auth";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import {
  View,
  TextInput,
  Button,
  FormErrorMessage,
  Icon,
  AppButton,
} from "../components";

import { useTogglePasswordVisibility } from "../hooks";
import { loginValidationSchema } from "../utils";
import { auth, Colors, Images } from "../config";

export const LoginScreen = ({ navigation }) => {
  const [errorState, setErrorState] = useState("");
  const { passwordVisibility, handlePasswordVisibility, rightIcon } =
    useTogglePasswordVisibility();

  const handleLogin = (values) => {
    const { email, password } = values;
    signInWithEmailAndPassword(auth, email, password).catch((error) =>
      setErrorState(error.message)
    );
  };
  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          {/* IconContainer: consits app icon and intro title */}
          <View style={styles.iconContainer}>
            <Icon
              onPress={() => navigation.navigate("Signup")}
              name="chevron-left"
              size={40}
              color={Colors.dark}
              style={styles.Icon}
            />
            <Text style={styles.screenTitle}>Welcome,</Text>
            <Text style={styles.screenTitle}>back.</Text>
          </View>
          <Formik
            initialValues={{
              email: "",
              password: "",
            }}
            validationSchema={loginValidationSchema}
            onSubmit={(values) => handleLogin(values)}
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
                <FormErrorMessage
                  error={errors.email}
                  visible={touched.email}
                />
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
                {/* Display Screen Error Messages */}
                {errorState !== "" ? (
                  <FormErrorMessage error={errorState} visible={true} />
                ) : null}
                {/* Login button */}
                <AppButton
                  size={20}
                  textColor={Colors.white}
                  title="Log in"
                  onPress={handleSubmit}
                  color={Colors.purple}
                />
              </>
            )}
          </Formik>
          {/* Button to navigate to Sign in screen */}
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={"Don't have an account?"}
            onPress={() => navigation.navigate("Signup")}
          />
          <Button
            style={styles.borderlessButtonContainer}
            borderless
            title={"Forgot Password?"}
            onPress={() => navigation.navigate("ForgotPassword")}
          />
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingTop: 40,
  },
  iconContainer: {
    alignItems: "flex-start",
    marginBottom: 80,
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
