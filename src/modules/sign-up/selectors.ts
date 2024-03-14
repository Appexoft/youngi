import { RootState } from "~/store/types";

export const selectUserRole = (state: RootState) => state.signUp.registrationInfo.role;
