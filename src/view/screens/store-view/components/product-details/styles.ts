import {
  getColorWithOpacity,
  radius,
} from "./../../../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors } from "~/constants/designConstants";
import { Platform, StyleSheet } from "react-native";

const isIOS = Platform.OS === "ios";

export const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: horizontalScale(24),
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
    flexDirection: "row",
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
    backgroundColor: "transparent",
    marginTop: verticalScale(40),
  },
  content: {
    alignItems: isIOS ? "flex-end" : "flex-start",
    justifyContent: "flex-start",
    bottom: 0,
    width: "100%",
    height: "100%",
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(24),
    backgroundColor: getColorWithOpacity(colors.white, 0.8),
    position: "relative",
    borderRadius: radius.large,
  },
  image: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    marginTop: verticalScale(90),
    marginBottom: verticalScale(16),
  },
  button: {
    position: "absolute",
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    bottom: 320,
    zIndex: 999,
    paddingHorizontal: horizontalScale(24),
  },

  shadow: {
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.05,
    shadowRadius: 17.62,
    elevation: 81,
  },
});
