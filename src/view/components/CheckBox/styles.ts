import { colors } from "~/constants/designConstants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    alignItems: "center",
    width: 20,
    height: 20,
    backgroundColor: colors.white,
    borderRadius: 4,
    borderColor: colors.lightBlue,
    borderWidth: 1,
  },
  active: {
    backgroundColor: colors.purpleLinear,
    borderColor: colors.purpleLinear,
  },
});
