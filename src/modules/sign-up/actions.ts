import { UserInfo } from "./types";
import { createAction } from "@reduxjs/toolkit";

export const setActiveStep = createAction<number>("signUp/SET_ACTIVE_STEP");
export const setRegistrationInfo = createAction<UserInfo>(
  "signUp/SET_REGISTRATION_INFO"
);
export const setTempToken = createAction<string | null>(
  "signUp/SET_TEMP_TOKEN"
);
