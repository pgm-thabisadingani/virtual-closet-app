import React, { useState, useEffect } from "react";
import { StyleSheet, Text, Alert } from "react-native";
import { auth, Colors, db, FontSizes } from "../config";
import { useNavigation } from "@react-navigation/native";
import { deleteUser, signOut } from "firebase/auth";
import {
  AppButton,
  Avatar,
  Error,
  Icon,
  LoadingIndicator,
  View,
} from "../components";
import { collection, onSnapshot, query, where } from "firebase/firestore";

export const ProfileScreen = () => {
  const userUid = auth.currentUser.uid;
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const navigation = useNavigation();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        // Sign-out successful.
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };
  // delete a profie
  const asyncDeleteProfile = () => {
    deleteUser(userUid)
      .then(() => {
        console.log("User deleted");
      })
      .catch((error) => {
        console.log("Error logging out: ", error);
      });
  };

  const handleDeleteProfile = () => {
    Alert.alert("Delete", "Are you sure you want to delete your profile", [
      { text: "Yes", onPress: () => asyncDeleteProfile() },
      { text: "No" },
    ]);
  };

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

  return (
    <View isSafe style={styles.container}>
      {isError ? (
        <Error>{isError}</Error>
      ) : isLoading || !user ? (
        <LoadingIndicator />
      ) : (
        <View style={styles.headerContainer}>
          <View style={styles.iconContainer}>
            <Icon
              name="pencil-outline"
              size={30}
              onPress={() =>
                navigation.navigate("UpdateProfile", {
                  userUid: user.id,
                  userName: user.username,
                  userPhotoUrl: user.photoURL,
                })
              }
              color={Colors.lightGray}
            />
          </View>
          <Avatar size={150} source={user.photoURL} />
          <Text style={styles.usernameText}>{user.username}</Text>
        </View>
      )}
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
    marginTop: -10,
  },
  headerContainer: {
    alignItems: "center",
    backgroundColor: Colors.white,
    padding: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: Colors.dark,
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.3,
    shadowRadius: 4.65,
    elevation: 8,

    backgroundColor: Colors.white,
    marginVertical: 20,
    borderRadius: 10,
    padding: 15,

    overflow: "hidden",
  },
  editItemContainer: {
    flex: 1,
    position: "absolute",
    height: "100%",
    width: "100%",
    justifyContent: "center",
    padding: 0,
    zIndex: 100,
    backgroundColor: Colors.white,
  },
  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  usernameText: {
    color: Colors.dark,
    textTransform: "capitalize",
    fontSize: FontSizes.title,
    marginTop: 20,
    borderBottomColor: Colors.lightGray,
    borderBottomWidth: 1,
    borderTopWidth: 1,
    fontWeight: "600",
  },
  iconContainer: {
    position: "absolute",
    top: 10,
    right: 10,
  },
});
