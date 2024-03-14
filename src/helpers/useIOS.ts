import { Platform } from "react-native";

export const useIOS = () => {
  return Platform.OS === "ios";
};
