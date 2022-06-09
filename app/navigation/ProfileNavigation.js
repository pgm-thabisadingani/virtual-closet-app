import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { View } from "../components";
import {
  EditProfileScreen,
  ProfileScreen,
  SaveItemImageScreen,
} from "../screens";

const Stack = createStackNavigator();

export const ProfileNavigation = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="ProfileHome" component={ProfileScreen} />

      <Stack.Screen
        name="SaveItemImage"
        component={SaveItemImageScreen}
        options={{ title: "Add Image", headerBackVisible: true }}
      />
      <Stack.Screen name="UpdateProfile" component={EditProfileScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});
