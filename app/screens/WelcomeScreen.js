import React from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { View, Logo, Button } from "../components";

import { useTogglePasswordVisibility } from "../hooks";
import { auth, Colors, Images } from "../config";

export const WelcomeScreen = ({ navigation }) => {
  return (
    <>
      <View isSafe style={styles.container}>
        <KeyboardAwareScrollView enableOnAndroid={true}>
          <View style={styles.innerContainer}>
            {/* LogoContainer: consits app logo and screen title */}
            <View style={styles.logoContainer}>
              <Logo uri={Images.logo} />
            </View>
            {/* Button to navigate to SignupScreen oe LoginScreen to create a new account */}
            <Button
              style={styles.button}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonText}>Sign In</Text>
            </Button>
            <Button
              style={styles.button}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.buttonText}>Sign Up</Text>
            </Button>
          </View>
        </KeyboardAwareScrollView>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
    paddingHorizontal: 30,
  },
  innerContainer: {
    marginTop: "40%",
  },
  logoContainer: {
    alignItems: "center",
    paddingBottom: 18,
  },

  button: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: Colors.purple,
    padding: 10,
    borderRadius: 25,
  },
  buttonText: {
    fontSize: 20,
    color: Colors.white,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
