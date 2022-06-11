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
  updateDoc,
  doc,
} from "firebase/firestore";

import { Formik } from "formik";
import { auth, Colors, db } from "../config";
import { userUpdateSchema } from "../utils";

import {
  AppButton,
  TextInput,
  View,
  AppCloseWindow,
  Avatar,
  Icon,
} from "../components";

export const EditProfileScreen = ({ photoURL }) => {
  const userUid = auth.currentUser.uid;
  const navigation = useNavigation();
  const [user, setUser] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);

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

  /* function to update profile in firestore */
  const handleUpdate = async (values) => {
    updateDoc(doc(db, "users", user.id), {
      username: values.username,
      photoURL: values.photoURL,
      displayName: values.username,
    })
      .then(console.log("Profile updated"), navigation.popToTop())
      .catch((err) => console.error(err));
  };

  return (
    <View isSafe style={styles.container}>
      <Formik
        initialValues={{
          username: "" || user.username,
          photoURL: "" || photoURL,
        }}
        validationSchema={userUpdateSchema}
        onSubmit={(values) => handleUpdate(values)}
      >
        {({ values, handleChange, handleSubmit, handleBlur }) => (
          <View style={styles.avatarWrapper}>
            {photoURL ? (
              <View>
                <Avatar
                  size={150}
                  source={photoURL}
                  onPress={() =>
                    navigation.navigate("SaveItemImage", {
                      goingTo: "avatar",
                    })
                  }
                />
                <Icon
                  name="camera"
                  size={30}
                  color={Colors.gray}
                  style={styles.avatarIcon}
                  onPress={() =>
                    navigation.navigate("SaveItemImage", {
                      goingTo: "avatar",
                    })
                  }
                />
              </View>
            ) : (
              <View>
                <Avatar
                  size={150}
                  source={user.photoURL}
                  onPress={() =>
                    navigation.navigate("SaveItemImage", {
                      goingTo: "avatar",
                    })
                  }
                />
                <Icon
                  name="camera"
                  size={30}
                  color={Colors.gray}
                  style={styles.avatarIcon}
                  onPress={() =>
                    navigation.navigate("SaveItemImage", {
                      goingTo: "avatar",
                    })
                  }
                />
              </View>
            )}
            <TextInput
              name="username"
              placeholder={user.username}
              value={values.username}
              onChangeText={handleChange("username")}
              onBlur={handleBlur("username")}
              rightIcon="pencil-outline"
            />
            <AppButton
              size={20}
              textColor={Colors.white}
              title="Save"
              onPress={handleSubmit}
              color={Colors.purple}
            />
          </View>
        )}
      </Formik>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.white,
  },

  avatarWrapper: {
    justifyContent: "center",
    alignItems: "center",
  },
  avatarIcon: {
    position: "absolute",
    right: 13,
  },
});
