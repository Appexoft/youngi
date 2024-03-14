import { IUser, IParentInfo, IChildInfo } from "./types";
import { createAction } from "@reduxjs/toolkit";

import { UserProfileModel } from "~/models/user";

export const setUser = createAction<UserProfileModel>("user/SET_USER");
export const setAuth = createAction<{ access: string; refresh: string } | null>(
  "user/SET_AUTH"
);
export const signOut = createAction("user/SIGN_OUT");
export const setAccessToken = createAction<string>("user/SET_ACCESS_TOKEN");
export const setUserInfo = createAction<IUser>("user/SET_USER_INFO");
export const setUserDetails = createAction<IParentInfo | IChildInfo>(
  "user/SET_USER_DETAILS"
);
export const setResetPasswordEmail = createAction<string>(
  "user/SET_RESET_PASSWORD_EMAIL"
);
