import { radius } from "../../../../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors } from "~/constants/designConstants";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
    borderTopLeftRadius: 42,
    borderTopRightRadius: 42,
    marginTop: verticalScale(16),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.62,
    elevation: 8,
    paddingTop: verticalScale(20),
    paddingHorizontal: horizontalScale(16),
    paddingBottom: verticalScale(100),
  },
  topBarContainer: {
    width: "100%",
    height: 120,
    flexDirection: isIOS ? "row" : "row-reverse",
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.08,
    shadowRadius: 6.82,
    elevation: 18,
    borderRadius: radius.main,
  },
  topBarTextContainer: {
    width: "65%",
    height: "100%",
    justifyContent: "center",
    alignItems: isIOS ? "flex-end" : "flex-start",
    paddingLeft: isIOS ? horizontalScale(24) : horizontalScale(0),
    paddingRight: isIOS ? horizontalScale(24) : horizontalScale(0),
  },
  topBarImage: {
    width: "35%",
    height: "100%",
    borderTopLeftRadius: isIOS ? 0 : radius.main,
    borderBottomLeftRadius: isIOS ? 0 : radius.main,
    borderTopRightRadius: isIOS ? radius.main : 0,
    borderBottomRightRadius: isIOS ? radius.main : 0,
  },
  subtitle: {
    width: "100%",
    alignItems: "flex-start",
    marginTop: verticalScale(16),
    marginBottom: verticalScale(12),
  },
});
