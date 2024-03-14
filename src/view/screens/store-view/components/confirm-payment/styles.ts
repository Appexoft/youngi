import { horizontalScale, verticalScale } from "~/constants/metrics";
import {
  colors,
  fonts,
  radius,
} from "~/constants/designConstants";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: horizontalScale(24),
    marginTop: isIOS ? verticalScale(70) : verticalScale(30),
  },
  goBackContainer: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
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
  headerInfo: {
    flexGrow: 1,
    height: 58,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: colors.white,
    borderRadius: radius.main,
    marginHorizontal: horizontalScale(14),
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.1,
    shadowRadius: 5.62,
    elevation: 8,
  },
  productImage: {
    height: 40,
    width: 40,
    marginLeft: horizontalScale(10),
  },
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    overflow: "visible",
  },
  circleWrapper: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.purpleLinear,
    borderRadius: 50,
    backgroundColor: colors.white,
  },
  circleInner: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: colors.purpleLinear,
  },
  content: {
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: verticalScale(250),
  },
  subtitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(12),
  },
  timerWrapper: {
    flexDirection: "row",
    alignItems: "flex-end",
    justifyContent: "center",
    marginTop: verticalScale(20),
  },
  timer: {
    fontSize: 15,
    fontFamily: fonts.MEDIUM,
    color: colors.grey,
    marginLeft: horizontalScale(5),
  },
  primaryBotton: {
    position: "absolute",
    bottom: verticalScale(55),
    right: horizontalScale(24),
    left: horizontalScale(24),
    justifyContent: "center",
    alignItems: "center",
  },
});
