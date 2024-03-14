import * as React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors } from "~/constants/designConstants";

import TabHomeIcon from "~/view/assets/svg-components/TabHomeIcon";
import TabDollarIcon from "~/view/assets/svg-components/TabDollarIcon";
import TabPeopleIcon from "~/view/assets/svg-components/TabPeopleIcon";
import TabCardIcon from "~/view/assets/svg-components/TabCardIcon";

import { HomeNavigator } from "./Home";

const Tab = createBottomTabNavigator();

export const TabNavigator: React.FC = () => {
  // const hideTabNav = useAppSelector((state) => state.navigation.hideTabNav);
  return (
    <>
      <Tab.Navigator
        screenOptions={({ route }: any) => ({
          gestureEnabled: false,
          headerShown: false,
          tabBarStyle: {
            height: verticalScale(80),
            paddingHorizontal: horizontalScale(5),
            paddingTop: verticalScale(5),
            backgroundColor: colors.light,
            position: "absolute",
            borderTopWidth: 0,
            // display: hideTabNav ? "none" : "flex",
            display: "none", // temporary hide tab navigation
            flexDirection: "row-reverse",
            borderTopLeftRadius: 40,
            borderTopRightRadius: 40,
          },
          tabBarActiveTintColor: colors.purpleLinear,
          tabBarInactiveTintColor: colors.lightBlue,
          tabBarLabel: () => {
            return null;
          },
        })}
        initialRouteName="Home"
      >
        <Tab.Screen
          options={({ route }: any) => ({
            gestureEnabled: false,
            headerShown: false,
            tabBarIcon: ({ color }: any) => {
              return <TabCardIcon color={color} />;
            },
          })}
          name="Card"
          component={HomeNavigator}
        />
        <Tab.Screen
          options={({ route }: any) => ({
            gestureEnabled: false,
            headerShown: false,
            tabBarIcon: ({ color }: any) => {
              return <TabDollarIcon color={color} />;
            },
          })}
          name="Dollar"
          component={HomeNavigator}
        />
        <Tab.Screen
          options={({ route }: any) => ({
            gestureEnabled: false,
            headerShown: false,
            tabBarIcon: ({ color }: any) => {
              return <TabPeopleIcon color={color} />;
            },
          })}
          name="Group"
          component={HomeNavigator}
        />
        <Tab.Screen
          options={({ route }: any) => ({
            gestureEnabled: false,
            headerShown: false,
            tabBarIcon: ({ color }: any) => {
              return <TabHomeIcon color={color} />;
            },
          })}
          name="Home"
          component={HomeNavigator}
        />
      </Tab.Navigator>
    </>
  );
};
