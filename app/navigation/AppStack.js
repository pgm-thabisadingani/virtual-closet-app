import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import {
  ChallengeDetailsScreen,
  CreateResponseScreen,
  ResponseScreen,
  SaveItemImageScreen,
  EditProfileScreen,
  SaveImageGoogleVisionScreen,
} from "../screens";

import { HomeTabs } from "./HomeTabs";
import { Colors } from "../config";

const forFade = ({ current }) => ({
  cardStyle: {
    opacity: current.progress,
  },
});

const Stack = createStackNavigator();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false, presentation: "modal" }}
    >
      <Stack.Screen name="Home" component={HomeTabs} />
      <Stack.Screen
        name="Challenge Details"
        component={ChallengeDetailsScreen}
        options={{
          headerShown: true,
          cardStyleInterpolator: forFade,
          headerTintColor: Colors.dark,
          headerStyle: { backgroundColor: Colors.light },
          headerTitleAlign: "center",
          title: "Challenge detail",
        }}
      />
      <Stack.Screen
        name="Create Response"
        component={CreateResponseScreen}
        options={{
          headerShown: true,
          cardStyleInterpolator: forFade,
          headerTintColor: Colors.dark,
          headerStyle: { backgroundColor: Colors.light },
          headerTitleAlign: "center",
          title: "Create a response",
        }}
      />
      <Stack.Screen
        name="Response"
        component={ResponseScreen}
        options={{
          headerShown: true,
          cardStyleInterpolator: forFade,
          headerTintColor: Colors.dark,
          headerStyle: { backgroundColor: Colors.light },
          headerTitleAlign: "center",
          title: "Response Cards",
        }}
      />

      <Stack.Screen
        name="UpdateProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          cardStyleInterpolator: forFade,
          headerTintColor: Colors.dark,
          headerStyle: { backgroundColor: Colors.light },
          headerTitleAlign: "center",
          title: "Update your profile",
        }}
      />
      <Stack.Screen
        name="SaveItemImage"
        component={SaveItemImageScreen}
        options={{
          headerShown: false,
        }}
      />
      <Stack.Screen
        name="SaveItemGoogleAi"
        component={SaveImageGoogleVisionScreen}
        options={{
          headerShown: false,
        }}
      />
    </Stack.Navigator>
  );
};
