import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import {
  ProfileScreen,
  CreateChallengeScreen,
  FeedsScreen,
  ClosetScreen,
  ChallengesScreen,
} from "../screens";
import { Colors } from "../config";
import { NewChallengeButton } from "./NewChallengeButton";

const Tab = createBottomTabNavigator();

export const HomeTabs = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerStyle: {
          backgroundColor: Colors.purple,
        },
        tabBarStyle: {
          height: 60,
        },
        tabBarItemStyle: {
          margin: 5,
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
            iconName = focused ? "plus-circle" : "plus-circle";
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
        tabBarInactiveTintColor: Colors.midLight,
      })}
    >
      <Tab.Screen
        name="Feeds"
        initialRouteName="Feeds"
        component={FeedsScreen}
        options={{ headerBackVisible: true }}
      />
      <Tab.Screen name="Closet" component={ClosetScreen} />
      <Tab.Screen
        name="Create"
        component={CreateChallengeScreen}
        options={({ navigation }) => ({
          tabBarButton: () => (
            <NewChallengeButton onPress={() => navigation.navigate("Create")} />
          ),
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons
              name="plus-circle"
              color={color}
              size={size}
            />
          ),
          title: "Create a challenge",
        })}
      />
      <Tab.Screen name="Challenges" component={ChallengesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
};
