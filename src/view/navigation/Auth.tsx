import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React, { useEffect } from "react";
import { ForgotPassword } from "../screens/authentication-screens/forgot-password";

import { InitialScreen } from "../screens/authentication-screens/initial";
import { SignIn } from "../screens/authentication-screens/sign-in";
import { SignUp } from "../screens/authentication-screens/sign-up";
import AddChild from "../screens/authentication-screens/sign-up/components/add-child";
import SuccessfulScreen from "../screens/authentication-screens/sign-up/components/successful-screen";
import ConnectParentOrChild from "../screens/connect-parent-child";

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const AuthStack = createNativeStackNavigator();

export const AuthNavigator: React.FC = () => {
  const navigation = useNavigation();

  useEffect(() => {
    (async () => {
      const wasLogged = await AsyncStorage.getItem("wasLogged");
      if (wasLogged) {
        navigation.navigate("SignIn");
      }
    })();
  }, []);

  return (
    <AuthStack.Navigator screenOptions={screenOptions} initialRouteName="InitialScreen">
      <AuthStack.Screen name="InitialScreen" component={InitialScreen} />
      <AuthStack.Screen name="SignUp" component={SignUp} />
      <AuthStack.Screen name="SignIn" component={SignIn} />
      <AuthStack.Screen name="ForgotPassword" component={ForgotPassword} />
      <AuthStack.Screen name="ConnectParentScreen" component={ConnectParentOrChild} />
      <AuthStack.Screen name="SuccessfulScreen" component={SuccessfulScreen} />
      <AuthStack.Screen name="AddChild" component={AddChild} />
    </AuthStack.Navigator>
  );
};
