import { colors, radius } from "./../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    flexDirection: isIOS ? "row-reverse" : "row",
  },
  content: {
    position: "relative",
    width: "100%",
    maxWidth: 256,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.main,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.07,
    shadowRadius: 17.62,
    elevation: 81,
    paddingVertical: verticalScale(18),
  },
  button: {
    position: "absolute",
    left: horizontalScale(19),
    justifyContent: "center",
    alignItems: "center",
    width: 40,
    height: 40,
    borderRadius: radius.secondary,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.07,
    shadowRadius: 17.62,
    elevation: 81,
  },
});
