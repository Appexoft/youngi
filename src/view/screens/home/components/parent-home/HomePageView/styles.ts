import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors, radius } from "~/constants/designConstants";

import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    borderRadius: radius.large,
    backgroundColor: colors.white,
    marginTop: verticalScale(25),
    paddingHorizontal: horizontalScale(20),
    paddingTop: verticalScale(20),
    // paddingBottom: verticalScale(130),
  },
  loaderContainer: {
    width: "100%",
    height: 146,
    justifyContent: "center",
    alignItems: "center",
  },
  topBar: {
    width: "100%",
    flexDirection: isIOS ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  myChildrenEmptyContainer: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",

  },
  myChildrenEmptyIcon: {
    marginTop: verticalScale(25),
    position: "relative",
    overflow: "visible",
    marginBottom: verticalScale(20),
  },
  myChildrenEmptyIconSecond: {
    position: "absolute",
    right: horizontalScale(-12),
    bottom: verticalScale(0),
  },
  emptyCardButton: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.main,
    marginTop: verticalScale(14),
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
