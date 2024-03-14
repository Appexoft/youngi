import {
  getColorWithOpacity,
  radius,
} from "./../../../../../constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";
import { colors } from "~/constants/designConstants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  wrapper: {
    width: "100%",
    paddingHorizontal: horizontalScale(15.5),
    marginTop: verticalScale(24),
  },
  container: {
    width: "100%",
    backgroundColor: colors.secondaryRed,
    borderRadius: radius.main,
    paddingVertical: verticalScale(16),
    paddingHorizontal: horizontalScale(18),
    justifyContent: "center",
  },
  circle: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 190,
    borderWidth: 13,
    borderColor: getColorWithOpacity(colors.white, 0.16),
    left: horizontalScale(-80),
    justifyContent: "center",
    alignItems: "center",
  },
  circleIOS: {
    position: "absolute",
    width: 280,
    height: 280,
    borderRadius: 190,
    borderWidth: 13,
    borderColor: getColorWithOpacity(colors.white, 0.16),
    right: horizontalScale(-80),
    justifyContent: "center",
    alignItems: "center",
  },
  circleInner: {
    width: 232,
    height: 232,
    borderRadius: 175,
    backgroundColor: getColorWithOpacity(colors.white, 0.16),
  },
  button: {
    position: "absolute",
    left: horizontalScale(32),
    right: horizontalScale(32),
    bottom: verticalScale(16),
    height: 48,
    backgroundColor: colors.white,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: radius.main,
  },
});
