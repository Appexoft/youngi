import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StackCardInterpolatedStyle, StackCardInterpolationProps } from "@react-navigation/stack";
import React from "react";
import { Animated } from "react-native";
import AddChild from "../screens/authentication-screens/sign-up/components/add-child";
import HomeScreen from "../screens/home";
import EditUserProfile from "../screens/home/components/edit-profile";
import AddCreditCard from "../screens/home/components/parent-home/AddCreditCard";
import ChildPage from "../screens/home/components/parent-home/ChildPage";
import ChildPermissions from "../screens/home/components/parent-home/ChildPermissions";
import MonthlyBudget from "../screens/home/components/parent-home/MonthlyBudget";
import PaymentMethods from "../screens/home/components/parent-home/PaymentMethods";
import { ParentChildConnectivityNavigator } from "./ParentChildConnectivity";
import { StoreNavigator } from "./Store";

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const HomeStack = createNativeStackNavigator();

export function forHorizontalModal({ current, next, inverted, layouts: { screen } }: StackCardInterpolationProps): StackCardInterpolatedStyle {
  const translateFocused = Animated.multiply(
    current.progress.interpolate({
      inputRange: [0, 1],
      outputRange: [screen.width, 0],
      extrapolate: "clamp",
    }),
    inverted
  );

  const overlayOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.07],
    extrapolate: "clamp",
  });

  const shadowOpacity = current.progress.interpolate({
    inputRange: [0, 1],
    outputRange: [0, 0.3],
    extrapolate: "clamp",
  });

  return {
    cardStyle: {
      transform: [
        // Translation for the animation of the current card
        { translateX: translateFocused },
        // Translation for the animation of the card in back
        { translateX: 0 },
      ],
    },
    overlayStyle: { opacity: overlayOpacity },
    shadowStyle: { shadowOpacity },
  };
}

export const HomeNavigator: React.FC = () => (
  <HomeStack.Navigator screenOptions={screenOptions} initialRouteName="HomeScreen">
    <HomeStack.Screen name="HomeScreen" component={HomeScreen} options={{ gestureEnabled: true }} />
    <HomeStack.Screen
      name="StoreStack"
      component={StoreNavigator}
      options={{
        gestureEnabled: true,
      }}
    />

    <HomeStack.Screen name="ConnectParentStack" component={ParentChildConnectivityNavigator} />
    <HomeStack.Screen name="AddCreditCard" component={AddCreditCard} />
    <HomeStack.Screen name="ChildScreen" component={ChildPage} />
    <HomeStack.Screen name="ChildPermissions" component={ChildPermissions} />
    <HomeStack.Screen name="MonthlyBudget" component={MonthlyBudget} />
    <HomeStack.Screen name="PaymentMethods" component={PaymentMethods} />
    <HomeStack.Screen name="AddChild" component={AddChild} />
    <HomeStack.Screen name="EditUserProfile" component={EditUserProfile} />
  </HomeStack.Navigator>
);
