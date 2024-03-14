import React from "react";
import { View, Platform } from "react-native";
import { BlurView } from "@react-native-community/blur";

interface Props {
  children: React.ReactNode;
  styles: any;
}

export const BluredView: React.FC<Props> = ({ children, styles }) => {
  if (Platform.OS !== "ios") {
    return <View style={styles}>{children}</View>;
  }

  return (
    <BlurView blurType="light" blurAmount={9} blurRadius={10} style={styles}>
      {children}
    </BlurView>
  );
};
