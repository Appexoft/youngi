import { RootState } from "~/store/types";

export const selectHideTabNav = (state: RootState) =>
  state.navigation.hideTabNav;
