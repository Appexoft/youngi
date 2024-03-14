import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import HomeScreen from "../screens/home";
import StoreView from "../screens/store-view";
import ConfirmPayment from "../screens/store-view/components/confirm-payment";
import ProductDetails from "../screens/store-view/components/product-details";
import SecretPin from "../screens/store-view/components/secret-pin";

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const StoreStack = createNativeStackNavigator();

export const StoreNavigator: React.FC = () => {
  return (
    <StoreStack.Navigator
      screenOptions={screenOptions}
      initialRouteName="StoreScreen"
    >
      <StoreStack.Screen
        name="StoreScreen"
        component={StoreView}
        options={{ gestureEnabled: false }}
      />
      <StoreStack.Screen name="ProductDetails" component={ProductDetails} />
      <StoreStack.Screen name="HomeScreen" component={HomeScreen} />
      <StoreStack.Screen name="SecretPin" component={SecretPin} />
      <StoreStack.Screen name="ConfirmPayment" component={ConfirmPayment} />
    </StoreStack.Navigator>
  );
};
