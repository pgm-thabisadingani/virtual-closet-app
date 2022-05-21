import React from "react";
import { View, StyleSheet, Text, Button } from "react-native";
import { auth, Images } from "../config";
import { signOut } from "firebase/auth";

export const ProfileScreen = (props) => {
  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleLogout} />
      <Text>This is a profile screen</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
