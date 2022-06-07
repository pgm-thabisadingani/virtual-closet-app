import React from "react";
import { StyleSheet, Text } from "react-native";
import { auth, Colors, Images } from "../config";
import { deleteUser, signOut } from "firebase/auth";
import { AppButton, Button, View } from "../components";

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
  const handleDeleteProfile = () => {
    // await deleteDoc(doc(db, "users", ));
    deleteUser(auth.currentUser)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };

  return (
    <View isSafe style={styles.container}>
      <AppButton
        size={20}
        textColor={Colors.white}
        title="Sign Out"
        onPress={handleLogout}
        color={Colors.purple}
      />
      <AppButton
        size={20}
        textColor={Colors.white}
        title="Delete profile"
        onPress={handleDeleteProfile}
        color={Colors.lightGray}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
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
  buttonLogOut: {
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
  buttonLogOut: {
    fontSize: 20,
    color: Colors.purple,
    fontWeight: "700",
    textTransform: "uppercase",
  },
});
