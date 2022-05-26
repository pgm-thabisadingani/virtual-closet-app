import React from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet } from "react-native";
import { View } from "../components";
import { ChallengeDetailsScreen, FeedsScreen } from "../screens";

const Stack = createStackNavigator();

export const FeedsNavigation = (props) => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="FeedsHome" component={FeedsScreen} />
      <Stack.Screen
        name="ChallengeDetails"
        component={ChallengeDetailsScreen}
      />
    </Stack.Navigator>
  );
};

const styles = StyleSheet.create({
  container: {},
});
