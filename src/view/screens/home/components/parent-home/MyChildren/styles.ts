import { getColorWithOpacity } from "./../../../../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors, radius } from "~/constants/designConstants";

import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
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
  itemContainer: {
    width: "100%",
    height: 126,
    borderRadius: radius.secondary,
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.07,
    shadowRadius: 10.62,
    elevation: 81,
    marginTop: verticalScale(20),
  },
  itemWrapper: {
    flexDirection: "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    overflow: "hidden",
    borderRadius: radius.main,
    position: "relative",
  },
  itemButtonWrapper: {
    flexDirection: isIOS ? "row-reverse" : "row",
    alignItems: "center",
    width: "100%",
    height: "100%",
    paddingRight: horizontalScale(16),
    paddingLeft: horizontalScale(8),
  },
  backgroundCircles: {
    position: "absolute",
    left: horizontalScale(-53),
    width: 150,
    height: 150,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 75,
    borderWidth: 8,
    borderColor: colors.white,
  },
  backgroundCirle: {
    width: 124,
    height: 124,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 62,
    backgroundColor: colors.white,
  },
  itemChildImage: {
    width: 68,
    height: 68,
    borderRadius: 34,
    backgroundColor: colors.lightBlue,
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  itemContent: {
    height: "100%",
    // width: "100%",
    flex: 1,
    justifyContent: "center",
    marginLeft: isIOS ? horizontalScale(0) : horizontalScale(24),
    marginRight: isIOS ? horizontalScale(24) : horizontalScale(0),
  },
  cardNoConnected: {
    marginTop: verticalScale(5),
  },
  cardNoConnectedRow: {
    flexDirection: "row",
  },
  cardNoConnectedButton: {
    marginHorizontal: horizontalScale(3),
  },
  treeDotsWrapper: {
    position: "absolute",
    right: horizontalScale(12),
    top: verticalScale(12),
    width: 32,
    height: 32,
  },
  treeDotsContainer: {
    // width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 6.62,
    elevation: 81,
  },
  modalWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: getColorWithOpacity("#000", 0.5),
    justifyContent: "flex-end",
  },
  modalContainer: {
    width: "100%",
    height: 395,
    justifyContent: "space-between",
  },
  modalChildWrapper: {
    width: "100%",
    paddingHorizontal: horizontalScale(20),
  },
  modalContent: {
    width: "100%",
    height: 228,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.biggest,
    borderTopRightRadius: radius.biggest,
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(25),
    alignItems: isIOS ? "flex-end" : "flex-start",
  },
  modalRow: {
    flexDirection: isIOS ? "row-reverse" : "row",
    alignItems: "center",
  },
  modalRowMargin: {
    marginTop: verticalScale(24),
  },
  modalRowText: {
    marginLeft: isIOS ? horizontalScale(0) : horizontalScale(8),
    marginRight: isIOS ? horizontalScale(8) : horizontalScale(0),
  },
  meCardBudgetCount: {
    flexDirection: "row",
    alignItems: "flex-end",
  },
  myCardScaleContainer: {
    width: "100%",
    marginTop: verticalScale(12),
  },
  myCardScaleTopBar: {
    width: "100%",
    flexDirection: isIOS ? "row-reverse" : "row",
    justifyContent: "space-between",
    marginBottom: verticalScale(8),
  },
  myCardScale: {
    width: "100%",
    height: 6,
    borderRadius: 20,
    backgroundColor: colors.lightBlue,
    justifyContent: isIOS ? "flex-end" : "flex-start",
    flexDirection: "row",
  },
  myCardProgressBar: {
    width: "40%",
    height: "100%",
    borderRadius: 20,
    backgroundColor: colors.purpleLinear,
  },
  myCardThreeDots: {
    position: "absolute",
    right: horizontalScale(16),
    top: verticalScale(16),
    width: 32,
    height: 32,
    borderRadius: 12,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: getColorWithOpacity(colors.white, 0.28),
  },
  loaderContainer: {
    // width: "100%",s
    height: 152,
    alignItems: "center",
    justifyContent: "center",
  },
});
