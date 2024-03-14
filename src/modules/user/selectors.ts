import { RootState } from "~/store/types";

export const selectAccessToken = (state: RootState) => state.user.accessToken;
