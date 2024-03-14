import { horizontalScale, verticalScale } from "~/constants/metrics";
import {
  colors,
  getColorWithOpacity,
  radius,
} from "~/constants/designConstants";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 90,
    marginTop: verticalScale(16),
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6.62,
    elevation: 8,
    borderRadius: 16,
    flexDirection: "row-reverse",
    alignItems: "center",
  },
  circleShadow: {
    height: 22,
    width: 40,
    borderRadius: 10,
    backgroundColor: colors.white,
    position: "absolute",
    zIndex: 1,
    left: -30,
    // shadowColor: "white",
    // shadowOffset: {
    //   width: 0,
    //   height: 0,
    // },
    // shadowOpacity: 1,
    // shadowRadius: 6.62,
    // elevation: 8,
  },
  circleShadowChildren: {
    position: "absolute",
    width: 10,
    height: 10,
    borderRadius: 7,
    backgroundColor: colors.white,
    zIndex: 2,
    right: 10,
    top: -6,
    shadowColor: "white",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 6.62,
    elevation: 8,
  },
  containerWrapper: {
    height: "100%",
    width: "100%",
    position: "relative",
    flexDirection: isIOS ? "row" : "row-reverse",
    alignItems: "center",
    overflow: "hidden",
    borderRadius: 16,
  },
  backgroundCircles: {
    position: "absolute",
    right: -79,
    width: 168,
    height: 168,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 10,
    borderColor: colors.purpleLinear,
    borderRadius: 89,
  },
  backgroundCirclesDisabled: {
    position: "absolute",
    right: -79,
    width: 168,
    height: 168,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderWidth: 10,
    borderColor: colors.lightBlue,
    borderRadius: 89,
  },
  backgroundCircle: {
    width: 138,
    height: 138,
    backgroundColor: colors.purpleLinear,
    borderRadius: 69,
  },
  backgroundCircleDisabled: {
    width: 138,
    height: 138,
    backgroundColor: colors.lightBlue,
    borderRadius: 69,
  },
  cropCircle: {
    position: "absolute",
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  cropCircleChild: {
    position: "absolute",
    top: 0,
    height: 10,
    width: 36,
    marginTop: -10,
    backgroundColor: "rgb(48, 47, 60)",
    alignSelf: "center",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.12,
    shadowRadius: 6.62,
    elevation: 8,
  },
  content: {
    alignItems: isIOS ? "flex-end" : "flex-start",
    width: "66%",
    height: "100%",
    justifyContent: "center",
    marginLeft: isIOS ? 0 : horizontalScale(16),
    marginRight: isIOS ? horizontalScale(16) : 0,
  },
  title: {
    flexDirection: isIOS ? "row" : "row-reverse",
    alignItems: "center",
    marginBottom: verticalScale(3),
  },
  validDate: {
    flexDirection: "row",
    justifyContent: isIOS ? "flex-end" : "flex-start",
    alignItems: "center",
    width: "100%",
    // maxWidth: 110,
  },
  discountIcon: {
    position: "absolute",
  },
});