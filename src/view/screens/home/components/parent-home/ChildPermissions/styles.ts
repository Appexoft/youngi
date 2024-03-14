import { useHebrew } from "../../../../../../i18n/index";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import {
  getColorWithOpacity,
  radius,
} from "../../../../../../constants/designConstants";
import { colors } from "~/constants/designConstants";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    backgroundColor: "#F2F2FA",
  },
  containerWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
    borderRadius: radius.large,
    marginTop: verticalScale(15),
    paddingVertical: verticalScale(20),
    paddingHorizontal: horizontalScale(16),
  },
  containerScrollView: {
    width: "100%",
    height: "100%",
  },
  topBar: {
    width: "100%",
    flexDirection: isIOS ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  titleText: {
    maxWidth: 200,
  },
  selectChildButton: {
    minWidth: 130,
    height: 45,
    flexDirection: isIOS ? "row" : "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    borderRadius: radius.main,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.62,
    elevation: 8,
    paddingHorizontal: horizontalScale(12),
  },
  selectChildArrow: {
    marginLeft: horizontalScale(8),
    marginRight: horizontalScale(0),
  },
  content: {
    width: "100%",
    marginTop: verticalScale(24),
  },
  topRow: {
    width: "100%",
    flexDirection: "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
  },
  businesses: {
    width: "100%",
  },
  storeRow: {
    width: "100%",
    flexDirection: isIOS ? "row-reverse" : "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: verticalScale(16),
  },
  storeRowInfo: {
    flexDirection: isIOS ? "row-reverse" : "row",
    alignItems: "center",
  },
  storeRowIcon: {
    width: 48,
    height: 48,
    borderRadius: 14,
    backgroundColor: colors.lightBlue,
    marginLeft: isIOS ? horizontalScale(12) : horizontalScale(0),
    marginRight: isIOS ? horizontalScale(0) : horizontalScale(12),
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
  },
  loaderContainer: {
    width: "100%",
    height: "100%",
    alignItems: "center",
    paddingTop: verticalScale(170),
  },
  selectChildModalContainer: {
    width: "100%",
    height: "100%",
    backgroundColor: getColorWithOpacity(colors.dark, 0.6),
    justifyContent: "flex-end",
  },
  selectChildModal: {
    width: "100%",
    height: 250,
    backgroundColor: colors.white,
    borderTopLeftRadius: radius.biggest,
    borderTopRightRadius: radius.biggest,
    paddingHorizontal: horizontalScale(30),
    paddingVertical: verticalScale(35),
  },
  selectChildModalItem: {
    width: "100%",
    marginTop: verticalScale(10),
  },
});
