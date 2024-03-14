import { horizontalScale } from "~/constants/metrics";
import { verticalScale } from "~/constants/metrics";
import { colors, radius } from "./../../../../../../constants/designConstants";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    position: "relative",
  },
  content: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    height: 360,
    backgroundColor: colors.white,
    borderTopRightRadius: radius.biggest,
    borderTopLeftRadius: radius.biggest,
    paddingHorizontal: horizontalScale(24),
    paddingTop: verticalScale(24),
    alignItems: "center",
  },
  cardCircle: {
    width: 100,
    height: 100,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
    borderWidth: 5,
    borderColor: colors.purpleLinear,
    marginBottom: verticalScale(24),
  },
  cardCircleInner: {
    width: 83,
    height: 83,
    borderRadius: 83,
    backgroundColor: colors.purpleLinear,
    justifyContent: "center",
    alignItems: "center",
  },
  primaryBotton: {
    marginTop: verticalScale(30),
    width: "100%",
  },
});
