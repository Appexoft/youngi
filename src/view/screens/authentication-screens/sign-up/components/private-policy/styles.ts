import { Dimensions, StyleSheet } from "react-native";
import { colors, radius } from "~/constants/designConstants";
import { horizontalScale, verticalScale } from "~/constants/metrics";

const height = Dimensions.get("window").height;

export const styles = StyleSheet.create({
  modalContainer: {
    height: height - 150,
    width: "100%",
    paddingHorizontal: horizontalScale(24),
    paddingBottom: verticalScale(26),
    borderRadius: radius.biggest,
    backgroundColor: colors.white,
    overflow: "hidden",
  },
  modalWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingTop: verticalScale(26),
    paddingBottom: verticalScale(10),
    backgroundColor: colors.white,
  },
  scrollView: {
    width: "100%",
    height: "100%",
  },
  button: {
    width: "100%",
    marginTop: verticalScale(20),
  },
});
