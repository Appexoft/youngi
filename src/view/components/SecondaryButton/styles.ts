import { colors, radius } from "../../../constants/designConstants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  button: {
    width: 160,
    height: 160,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.large,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 13,
    },
    shadowOpacity:  0.14,
    shadowRadius: 14.86,
    elevation: 18
  },
});
