import * as React from "react";
import { createStackNavigator } from "@react-navigation/stack";

import { HomeScreen } from "../screens";

const Stack = createStackNavigator();

export const AppStack = ({ isOnline }) => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} isOnline={isOnline} />
    </Stack.Navigator>
  );
};
