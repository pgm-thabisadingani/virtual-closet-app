import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { View } from "../components";
import { getHeaderTitle } from "@react-navigation/elements";
import {
  AddClothingItemScreen,
  ClosetScreen,
  EditClothingItemScreen,
} from "../screens";

const Stack = createStackNavigator();

export const ClosetNavigation = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
      options={{ headerBackVisible: true }}
    >
      <Stack.Screen name="ClosetHome" component={ClosetScreen} />
      <Stack.Screen
        name="AddClothing"
        component={AddClothingItemScreen}
        options={{ title: "Add Clothing", headerBackVisible: true }}
      />
      <Stack.Screen name="EditClothing" component={EditClothingItemScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});
