import { useHebrew } from "./../../../../../../i18n/index";
import {
  colors,
  getColorWithOpacity,
  radius,
} from "./../../../../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { StyleSheet } from "react-native";

const isHebrew = useHebrew();

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    backgroundColor: "#F2F2FA",
  },
  content: {
    marginTop: verticalScale(24),
    width: "100%",
    height: "100%",
    backgroundColor: colors.white,
    borderRadius: radius.biggest,
    paddingVertical: verticalScale(25),
  },
  mainContent: {
    paddingHorizontal: horizontalScale(23),
  },
  row: {
    marginTop: verticalScale(20),
    width: "100%",
  },
  card: {
    width: "100%",
    paddingTop: verticalScale(12),
    paddingBottom: verticalScale(20),
    paddingLeft: isHebrew ? horizontalScale(12) : horizontalScale(20),
    paddingRight: isHebrew ? horizontalScale(20) : horizontalScale(12),
    marginTop: verticalScale(25),
    backgroundColor: colors.purpleLinear,
    borderRadius: radius.main,
    position: "relative",
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.25,
    shadowRadius: 18.62,
    elevation: 81,
  },
  creditOrDebit: {
    width: "100%",
    alignItems: "flex-end",
  },
  cardNumber: {
    width: "100%",
    marginTop: verticalScale(16),
    alignItems: "flex-start",
  },
  inputContainerRight: {
    width: "100%",
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
    fontSize: 15,
    backgroundColor: getColorWithOpacity(colors.dark, 0.12),
    borderRadius: 12,
    marginTop: verticalScale(8),
    textAlign: "right",
    color: colors.white,
  },
  inputContainer: {
    width: "100%",
    paddingHorizontal: horizontalScale(12),
    paddingVertical: verticalScale(10),
    fontSize: 15,
    backgroundColor: getColorWithOpacity(colors.dark, 0.12),
    borderRadius: 12,
    marginTop: verticalScale(8),
    color: colors.white,
  },
  cardRow: {
    flexDirection: "row-reverse",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: verticalScale(25),
    width: "100%",
  },
  cardItem: {
    alignItems: "flex-start",
    width: "47%",
  },
  button: {
    marginTop: verticalScale(50),
    marginBottom: verticalScale(20),
  },
  resultContainer: {
    width: "100%",
    backgroundColor: getColorWithOpacity(colors.white, 0.5),
    alignItems: "center",
  },
  circleWrapperBigger: {
    width: 100,
    height: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5.5,
    borderColor: colors.purpleLinear,
    borderRadius: 50,
    backgroundColor: colors.white,
    marginTop: verticalScale(148),
  },
  circleInner: {
    width: 62,
    height: 62,
    borderRadius: 41,
    backgroundColor: colors.purpleLinear,
    justifyContent: "center",
    alignItems: "center",
  },
  circleInnerBigger: {
    width: 82,
    height: 82,
    borderRadius: 41,
    backgroundColor: colors.purpleLinear,
    justifyContent: "center",
    alignItems: "center",
  },
  resultContent: {
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
  resultButtonContainer: {
    position: "absolute",
    bottom: verticalScale(45),
    width: "100%",
    paddingHorizontal: horizontalScale(24),
  },
  resultReturnButton: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.main,
    backgroundColor: colors.white,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20.62,
    elevation: 81,
  },
  resultMainButton: {
    width: "100%",
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.main,
    backgroundColor: colors.purpleLinear,
    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 0.1,
    shadowRadius: 20.62,
    elevation: 81,
    marginTop: verticalScale(24),
  },
  resultHeader: {
    width: "100%",
    marginTop: verticalScale(40),
  },

  addCardHeader: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    marginBottom: verticalScale(20),
  },
});
