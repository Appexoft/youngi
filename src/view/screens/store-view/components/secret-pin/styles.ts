import { horizontalScale, verticalScale } from "~/constants/metrics";
import {
  colors,
  fonts,
  getColorWithOpacity,
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
    position: "relative",
    backgroundColor: getColorWithOpacity(colors.white, 0.7),
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
  headerSubtitle: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(4),
  },
  content: {
    alignItems: "center",
    marginTop: verticalScale(30),
  },
  pinContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: verticalScale(50),
  },
  pinItem: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.lightBlue,
    marginRight: horizontalScale(24),
  },
  pinItemActive: {
    width: 14,
    height: 14,
    borderRadius: 7,
    backgroundColor: colors.dark,
  },
  codeButtons: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    flexWrap: "wrap",
    paddingHorizontal: horizontalScale(40),
    marginTop: verticalScale(40),
  },
  codeButton: {
    width: 80,
    height: 80,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 40,
    backgroundColor: colors.white,
    marginRight: horizontalScale(24),
    marginBottom: verticalScale(24),
  },
  lastInRow: {
    marginRight: horizontalScale(0),
  },
  forgotCodeButton: {
    position: "absolute",
    bottom: 45,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  codeButtonsLastRow: {
    width: "100%",
    flexDirection: isIOS ? "row-reverse" : "row",
    alignItems: "center",
  },
});
