import {
  colors,
  getColorWithOpacity,
  radius,
} from "./../../../../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    position: "relative",
  },
  containerWrapper: {
    width: "100%",
    height: "100%",
  },
  header: {
    width: "100%",
    marginTop: verticalScale(15),
  },
  content: {
    width: "100%",
    height: "100%",
    borderRadius: radius.biggest,
    marginTop: verticalScale(24),
    alignItems: "center",
    backgroundColor: getColorWithOpacity(colors.white, 0.5),
  },
  childImage: {
    width: 92,
    height: 92,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 46,
    marginTop: verticalScale(40),
    overflow: "hidden",
    backgroundColor: colors.lightBlue,
  },
  selectBudgetContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    flexWrap: "wrap",
    paddingHorizontal: horizontalScale(24),
    marginTop: verticalScale(24),
  },
  budgetItem: {
    width: 104,
    height: 48,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.main,
    shadowColor: "#000000",
    shadowOffset: {
      width: -4,
      height: 5,
    },
    shadowOpacity: 0.12,
    shadowRadius: 10.62,
    elevation: 81,
    backgroundColor: colors.white,
  },
  manualBudget: {
    marginTop: verticalScale(32),
    width: "100%",
  },
  button: {
    position: "absolute",
    bottom: verticalScale(45),
    width: "100%",
    paddingHorizontal: horizontalScale(24),
  },
});
