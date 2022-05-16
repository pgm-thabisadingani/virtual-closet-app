import React from "react";
import { Text, StyleSheet } from "react-native";
import { KeyboardAwareScrollView } from "react-native-keyboard-aware-scroll-view";

import { View, Logo, Button } from "../components";
import { Colors, Images } from "../config";

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
              style={styles.buttonSignIn}
              onPress={() => navigation.navigate("Login")}
            >
              <Text style={styles.buttonTextSignIn}>Sign In</Text>
            </Button>
            <Button
              style={styles.buttonSignUp}
              onPress={() => navigation.navigate("Signup")}
            >
              <Text style={styles.buttonTextSignUp}>Sign Up</Text>
            </Button>
          </View>
          {/* App info footer */}
          <View style={styles.footer}>
            <Text style={styles.footerText}>
              Vitual closet App (help assist with your every style needs)
            </Text>
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
  },
  innerContainer: {
    marginTop: "40%",
  },
  logoContainer: {
    alignItems: "center",
    paddingBottom: 18,
  },
  footer: {
    backgroundColor: Colors.white,
    paddingHorizontal: 12,
    paddingBottom: 48,
    alignItems: "center",
    marginTop: 220,
  },
  footerText: {
    fontSize: 14,
    fontWeight: "700",
    color: Colors.purple,
  },
  buttonSignIn: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginTop: 8,
    marginBottom: 10,
    backgroundColor: Colors.purple,
    padding: 10,
    borderRadius: 25,
  },
  buttonSignUp: {
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
    color: Colors.white,
    fontWeight: "700",
    textTransform: "uppercase",
  },
  buttonTextSignUp: {
    fontSize: 20,
    color: Colors.purple,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
