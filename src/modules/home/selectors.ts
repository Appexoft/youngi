import { RootState } from "~/store/types";

export const selectActiveStore = (state: RootState) => state.home.activeStore;
