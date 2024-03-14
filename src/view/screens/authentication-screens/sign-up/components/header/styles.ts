import { radius } from "./../../../../../../constants/designConstants";
import { colors } from "~/constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { StyleSheet } from "react-native";
import { useTranslation } from "~/i18n";

const { i18n } = useTranslation();

export const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    width: "100%",
    paddingHorizontal: horizontalScale(24),
  },
  stepContainer: {
    width: i18n.language === "en" ? "85%" : "65%",
    height: 56,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: horizontalScale(15),
    backgroundColor: colors.white,
    borderRadius: radius.main,
    shadowColor: "rgba(28, 16, 32, 0.1)",
    shadowOffset: { width: -2, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  wrapper: {
    alignItems: "flex-end",
  },
  stepsTitle: {
    marginRight: horizontalScale(12),
  },
  steps: {
    flexDirection: "row-reverse",
    alignItems: "center",
    marginLeft: horizontalScale(2),
  },
  stepItem: {
    width: 4,
    height: 4,
    marginTop: verticalScale(8),
    marginRight: horizontalScale(12),
    backgroundColor: colors.lightBlue,
    borderRadius: 2,
  },
  stepItemActive: {
    backgroundColor: colors.purpleSecond,
  },
  goBackContainer: {
    // position: "absolute",
    // right: -58,
    marginLeft: horizontalScale(16),
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.secondary,
  },
});
