import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import EnterCode from "../screens/connect-parent-child/components/enter-code";
import EnterPhone from "../screens/connect-parent-child/components/enter-phone";
import Introdaction from "../screens/connect-parent-child/components/Introdaction";
import InvitationSend from "../screens/connect-parent-child/components/InvitationSend";
import Invite from "../screens/connect-parent-child/components/Invite";
import SuccessfullyConnect from "../screens/connect-parent-child/components/successfully-connect";
import UnsuccessfullyConnect from "../screens/connect-parent-child/components/unsuccessfully-connect";

const screenOptions = {
  gestureEnabled: false,
  headerShown: false,
};

const ParentChildConnectivityStack = createNativeStackNavigator();

export const ParentChildConnectivityNavigator: React.FC = () => {
  return (
    <ParentChildConnectivityStack.Navigator
      screenOptions={screenOptions}
      initialRouteName="IntrodactionScreen"
    >
      <ParentChildConnectivityStack.Screen
        name="IntrodactionScreen"
        component={Introdaction}
      />
      <ParentChildConnectivityStack.Screen
        name="InviteScreen"
        component={Invite}
      />
      <ParentChildConnectivityStack.Screen
        name="InvitationSend"
        component={InvitationSend}
      />
      <ParentChildConnectivityStack.Screen
        name="EnterInvitePhone"
        component={EnterPhone}
      />
      <ParentChildConnectivityStack.Screen
        name="EnterInviteCode"
        component={EnterCode}
      />
      <ParentChildConnectivityStack.Screen
        name="SuccessfullyConnect"
        component={SuccessfullyConnect}
      />
      <ParentChildConnectivityStack.Screen
        name="UnsuccessfullyConnect"
        component={UnsuccessfullyConnect}
      />
    </ParentChildConnectivityStack.Navigator>
  );
};
