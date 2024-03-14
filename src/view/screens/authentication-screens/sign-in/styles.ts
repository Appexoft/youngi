import { colors, radius } from "./../../../../constants/designConstants";
import { StyleSheet } from "react-native";
import { horizontalScale, verticalScale } from "~/constants/metrics";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: verticalScale(40),
  },
  header: {
    width: "100%",
    height: 50,
    alignItems: "flex-end",
    paddingRight: horizontalScale(25),
    marginTop: verticalScale(15),
  },
  goBackContainer: {
    marginLeft: horizontalScale(16),
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: radius.secondary,
  },
  containerWrapper: {
    position: "absolute",
    bottom: 0,
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    maxHeight: "100%",
    height: 480,
    paddingTop: verticalScale(28),
    paddingHorizontal: horizontalScale(30),
    backgroundColor: colors.white,
    borderRadius: radius.large,
  },
  content: {
    width: "100%",
    alignItems: "center",
  },
  title: {
    marginRight: horizontalScale(-2),
  },
  subtitle: {
    marginTop: verticalScale(10),
  },
  row: {
    marginTop: verticalScale(16),
    width: "100%",
  },
  forgotPasswordContainer: {
    width: "100%",
    alignItems: "flex-start",
  },
  button: {
    width: "100%",
    marginBottom: verticalScale(40),
  },
  modalContainer: {
    height: 240,
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingTop: verticalScale(10),
    paddingHorizontal: horizontalScale(30),
    borderRadius: radius.main,
    backgroundColor: colors.white,
  },
  modalWrapper: {
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.5)",
    justifyContent: "flex-end",
  },
});
