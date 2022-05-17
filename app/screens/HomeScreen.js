import React from "react";
import { View, StyleSheet, Button, Image } from "react-native";
import { signOut } from "firebase/auth";

import { auth, Images } from "../config";

export const HomeScreen = ({ size = 20 }) => {
  // console.log(auth.currentUser.photoURL) it works;
  console.log(auth.currentUser.photoURL);
  const handleLogout = () => {
    signOut(auth).catch((error) => console.log("Error logging out: ", error));
  };
  return (
    <View style={styles.container}>
      <Button title="Sign Out" onPress={handleLogout} />
      <Image
        style={{
          width: 80,
          height: 80,
          borderRadius: 80,
        }}
        source={{ uri: auth.currentUser.photoURL }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
