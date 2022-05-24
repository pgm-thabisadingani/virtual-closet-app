import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  FeedsScreen,
  ProfileScreen,
  ClosetScreen,
  ChallengesScreen,
  CreateChallengeScreen,
} from "../screens";
import { Colors } from "../config";

const Tab = createBottomTabNavigator();

export const AppStack = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: Colors.purple,
        },
        headerTitleStyle: { color: Colors.white },
        headerTitleAlign: "center",
        headerTintColor: Colors.white,

        tabBarIcon: ({ focused, color, size }) => {
          let iconName;
          if (route.name === "Feeds") {
            iconName = focused ? "home" : "home";
          } else if (route.name === "Closet") {
            iconName = focused ? "tshirt-crew" : "tshirt-crew";
          } else if (route.name === "Create") {
            iconName = focused ? "at" : "at";
          } else if (route.name === "Challenges") {
            iconName = focused ? "text-box-multiple" : "text-box-multiple";
          } else if (route.name === "Profile") {
            iconName = focused ? "account" : "account";
          }
          // You can return any component that you like here!
          return (
            <MaterialCommunityIcons name={iconName} size={size} color={color} />
          );
        },
        tabBarActiveTintColor: Colors.purple,
        tabBarInactiveTintColor: Colors.lightGray,
      })}
    >
      <Tab.Screen name="Feeds" component={FeedsScreen} />
      <Tab.Screen name="Closet" component={ClosetScreen} />
      <Tab.Screen name="Create" component={CreateChallengeScreen} />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
