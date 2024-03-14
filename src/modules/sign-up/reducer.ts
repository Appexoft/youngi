import { createReducer } from "@reduxjs/toolkit";
import { setActiveStep, setRegistrationInfo, setTempToken } from "./actions";
import { SignUpState } from "./types";

export const initialState: SignUpState = {
  activeStep: 1,
  registrationInfo: {
    name: null,
    email: null,
    phone: null,
    password: null,
    passwordConfirm: null,
    role: null,
    active: true,
    payable: true,
    phoneToken: null,
  },
  tempToken: null,
};

export const signUpReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setActiveStep, (state, { payload }) => {
      state.activeStep = payload;
    })
    .addCase(setRegistrationInfo, (state, { payload }) => {
      state.registrationInfo = { ...state.registrationInfo, ...payload };
    })
    .addCase(setTempToken, (state, { payload }) => {
      state.tempToken = payload;
    })
);
