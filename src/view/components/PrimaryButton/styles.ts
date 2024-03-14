import { colors, radius } from "./../../../constants/designConstants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 60,
    borderRadius: radius.main,
    overflow: "hidden",
  },
  containerSmall: {
    height: 48,
  },
  button: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  disabled: {
    backgroundColor: colors.dark,
  },
});
