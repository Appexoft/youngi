import { verticalScale } from "~/constants/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
  },
  loaderContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: verticalScale(170),
  },
});
