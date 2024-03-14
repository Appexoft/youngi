import { horizontalScale, verticalScale } from "~/constants/metrics";
import {
  colors,
  fonts,
  getColorWithOpacity,
  radius,
  textStyles,
} from "~/constants/designConstants";
import { Platform, StyleSheet } from "react-native";
import { Dimensions } from "react-native";

const widht = Dimensions.get("window").width;
const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  imageBackgroundContainer: {
    position: "absolute",
    width: "100%",
    height: 255,
    top: 0,
    left: -1,
    right: 0,
    zIndex: -1,
    justifyContent: "flex-start",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    width: "101%",
    height: "102%",
  },
  containerWrapper: {
    width: "100%",
    alignSelf: "flex-start",
    paddingBottom: verticalScale(50),
  },
  header: {
    position: "absolute",
    top: 60,
    width: "100%",
    flexDirection: isIOS ? "row" : "row-reverse",
    justifyContent: "space-between",
    alignItems: "center",
    zIndex: 1,
  },
  discount: {
    height: 35,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(6),
    backgroundColor: getColorWithOpacity(colors.purpleSecond, 0.85),
    borderTopLeftRadius: isIOS ? 0 : 10,
    borderBottomLeftRadius: isIOS ? 0 : 10,
    borderTopRightRadius: isIOS ? 10 : 0,
    borderBottomRightRadius: isIOS ? 10 : 0,
    opacity: 0, // ------ temporary -------
  },
  goBackContainer: {
    marginLeft: isIOS ? horizontalScale(0) : horizontalScale(24),
    marginRight: isIOS ? horizontalScale(24) : horizontalScale(0),

    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.secondary,
  },
  content: {
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
    marginTop: verticalScale(135),
    borderRadius: 42,
    alignItems: "center",
    position: "relative",
    zIndex: 99,
  },
  logoWrapper: {
    width: 88,
    height: 88,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    marginTop: verticalScale(-44),
    borderRadius: radius.main,
    overflow: "hidden",
  },
  logo: {
    width: "150%",
    height: "150%",
  },
  title: {
    marginTop: verticalScale(12),
  },
  topInfo: {
    marginTop: verticalScale(10),
    flexDirection: "row",
  },
  topInfoBlock: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: horizontalScale(10),
    paddingVertical: verticalScale(6),
    backgroundColor: colors.lightPurple,
    borderRadius: 10,
  },
  open: {
    height: 6,
    width: 6,
    borderRadius: 3,
    backgroundColor: "#18CB75",
    marginLeft: 5,
  },
  promotions: {
    width: "100%",
    alignItems: isIOS ? "flex-end" : "flex-start",
    marginTop: verticalScale(24),
    paddingHorizontal: horizontalScale(16),
    borderBottomColor: colors.lightBlue,
    borderBottomWidth: 1,
    paddingBottom: verticalScale(20),
  },
  paymentContainer: {
    marginTop: verticalScale(20),
    alignItems: isIOS ? "flex-end" : "flex-start",
    width: "100%",
    paddingHorizontal: horizontalScale(23),
  },
  amountToPay: {
    fontFamily: fonts.MEDIUM,
    fontSize: textStyles.SMALL,
  },
  buttonWrapper: {
    width: "100%",
    paddingHorizontal: horizontalScale(24),
    zIndex: 999,
    marginTop: verticalScale(30),
  },
});
