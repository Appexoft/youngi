import { useHebrew } from "./../../../../../i18n/index";

import { StyleSheet } from "react-native";

const isHebrew = useHebrew();

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F2F2FA",
  },
  containerWrapper: {
    width: "100%",
    height: "100%",
  },
});
