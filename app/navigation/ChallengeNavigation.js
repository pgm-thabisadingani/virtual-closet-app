import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { View } from "../components";
import {
  ChallengeDetailsScreen,
  ChallengesScreen,
  ResponseScreen,
} from "../screens";

const Stack = createStackNavigator();

export const ChallengeNavigation = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="ChallengeHome" component={ChallengesScreen} />
      <Stack.Screen
        name="ChallengeDetails"
        component={ChallengeDetailsScreen}
      />
      <Stack.Screen name="Response" component={ResponseScreen} />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});
