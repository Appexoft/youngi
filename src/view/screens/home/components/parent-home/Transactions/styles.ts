import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors, radius } from "~/constants/designConstants";

import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: isIOS ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(24),
  },
  paymentInfo: {
    flexDirection: isIOS ? "row-reverse" : "row",
    alignItems: "center",
  },
  storeLogo: {
    width: 64,
    height: 64,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 14,
    overflow: "hidden",
    marginRight: isIOS ? horizontalScale(0) : horizontalScale(12),
    marginLeft: isIOS ? horizontalScale(12) : horizontalScale(0),
  },
});
