import {
  getColorWithOpacity,
  radius,
} from "../../../../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors } from "~/constants/designConstants";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    position: "relative",
    width: "100%",
    backgroundColor: colors.white,
    borderRadius: radius.main,
    marginTop: verticalScale(16),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6.82,
    elevation: 18,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(12),
    flexDirection: isIOS ? "row" : "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  image: {
    width: 68,
    height: 68,
    borderRadius: 20,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
  content: {
    marginLeft: horizontalScale(12),
    marginRight: isIOS ? horizontalScale(12) : horizontalScale(0),
    maxWidth: 220,
    width: "100%",
  },
  date: {
    flexDirection: isIOS ? "row" : "row-reverse",
    alignItems: "center",
    justifyContent: "flex-end",
  },
  kosher: {
    position: "absolute",
    top: 12,
    left: 12,
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(5),
    backgroundColor: getColorWithOpacity(colors.purpleLinear, 0.2),
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  },
});
