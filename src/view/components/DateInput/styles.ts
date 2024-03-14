import { radius } from "../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors } from "~/constants/designConstants";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    alignItems: isIOS ? "flex-end" : "flex-start",
  },
  containerHebrew: {
    width: "100%",
    alignItems: "flex-end",
  },
  inputContainer: {
    position: "relative",
    flexDirection: "row",
    justifyContent: "flex-start",
    alignItems: "center",
    width: "100%",
    height: 48,
    marginTop: verticalScale(8),
    paddingHorizontal: horizontalScale(12),
    backgroundColor: colors.light,
    borderRadius: radius.medium,
  },
  inputContainerRight: {
    justifyContent: "flex-end",
  },
  button: {
    position: "absolute",
    right: horizontalScale(5),
    justifyContent: "center",
    alignItems: "center",
    width: 38,
    height: 38,
    backgroundColor: colors.white,
    borderRadius: radius.secondary,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.62,
    elevation: 8,
  },
  buttonHebrew: {
    position: "absolute",
    left: horizontalScale(5),
    justifyContent: "center",
    alignItems: "center",
    width: 38,
    height: 38,
    backgroundColor: colors.white,
    borderRadius: radius.secondary,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.62,
    elevation: 8,
  },
});
