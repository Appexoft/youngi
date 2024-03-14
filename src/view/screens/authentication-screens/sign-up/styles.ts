import { StyleSheet } from "react-native";
import { verticalScale } from "~/constants/metrics";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: "100%",
    justifyContent: "flex-start",
    alignItems: "center",
    paddingBottom: verticalScale(40),
  },
  title: {
    marginBottom: verticalScale(6),
  },
  subtitle: {
    marginBottom: verticalScale(30),
  },
  bottomRow: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    marginTop: verticalScale(32),
  },
  content: {
    height: "80%",
    width: "100%",
    backgroundColor: "red",
  },
});
