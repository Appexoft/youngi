import { radius } from "./../../../../../constants/designConstants";
import { Platform, StyleSheet } from "react-native";
import { colors } from "~/constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    flexDirection: isIOS ? "row" : "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: horizontalScale(24),
    paddingVertical: verticalScale(15),
  },
  itemContainer: {
    width: 40,
    height: 40,
    backgroundColor: colors.white,
    borderRadius: radius.secondary,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.62,
    elevation: 8,
  },
  titleContainer: {
    flexDirection: isIOS ? "row" : "row-reverse",
    alignItems: "center",
  },
  titleText: {
    marginHorizontal: horizontalScale(8),
  },
});
