import React from "react";
import { NavigationContainer, useNavigationContainerRef } from "@react-navigation/native";

import { AuthNavigator } from "./Auth";
import { useReduxDevToolsExtension } from "@react-navigation/devtools";
import { useAppSelector } from "~/store/hooks";
import { selectAccessToken } from "~/modules/user/selectors";
// import { TabNavigator } from "./TabNav"; // temporary stop working on it
import { HomeNavigator } from "./Home";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const AuthStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();

const AuthStackNav = () => (
  <AuthStack.Navigator screenOptions={screenOptions}>
    <AuthStack.Screen name="AuthStack" component={AuthNavigator} />
  </AuthStack.Navigator>
);

const HomeStackNav = () => (
  <HomeStack.Navigator screenOptions={screenOptions}>
    <HomeStack.Screen name="HomeStack" component={HomeNavigator} />
  </HomeStack.Navigator>
);

export const AppNavigator: React.FC = () => {
  const accessToken = useAppSelector(selectAccessToken);
  const navigationRef = useNavigationContainerRef();

  useReduxDevToolsExtension(navigationRef);

  const handleNavigationStack = React.useCallback(() => {
    if (accessToken) {
      return <HomeStackNav />;
    } else {
      return <AuthStackNav />;
    }
  }, [accessToken]);

  return <NavigationContainer>{handleNavigationStack()}</NavigationContainer>;
};
