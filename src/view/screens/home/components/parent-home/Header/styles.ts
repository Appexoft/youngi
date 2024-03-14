import { radius } from "./../../../../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { StyleSheet } from "react-native";
import { colors } from "~/constants/designConstants";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(24),
    marginTop: verticalScale(15),
  },
  containerAndroid: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: horizontalScale(24),
    marginTop: verticalScale(20),
  },
  button: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.secondary,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 17.62,
    elevation: 81,
  },
});
