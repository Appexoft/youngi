import { useHebrew } from "~/i18n";
import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "~/constants/metrics";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-end",
    alignItems: "center",
    paddingBottom: verticalScale(40),
    paddingHorizontal: horizontalScale(24),
  },
  title: {
    marginBottom: verticalScale(6),
  },
  subtitle: {
    marginBottom: verticalScale(30),
    marginRight: horizontalScale(6),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(32),
  },
});
