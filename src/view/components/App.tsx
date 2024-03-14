import React, { useEffect } from "react";
import RNBootSplash from "react-native-bootsplash";

import { AppNavigator } from "../navigation/App";

export const App: React.FC = () => {
  useEffect(() => {
    RNBootSplash.hide(); // hide splash screen when app is already loaded
  }, []);

  return <AppNavigator />;
};
