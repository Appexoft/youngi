import { createReducer } from "@reduxjs/toolkit";
import {
  setAccessToken,
  setResetPasswordEmail,
  setUserDetails,
  setUserInfo,
} from "./actions";
import { UserState } from "./types";

export const initialState: UserState = {
  accessToken: null,
  user: {
    email: "",
    role: "",
  },
  info: null,
  resetPasswordEmail: "",
};

export const userReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setAccessToken, (state, { payload }) => {
      state.accessToken = payload;
    })
    .addCase(setUserInfo, (state, { payload }) => {
      state.user = payload;
    })
    .addCase(setUserDetails, (state, { payload }) => {
      state.info = payload;
    })
    .addCase(setResetPasswordEmail, (state, { payload }) => {
      state.resetPasswordEmail = payload;
    })
);
