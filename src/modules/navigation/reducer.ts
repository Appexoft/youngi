import { createReducer } from "@reduxjs/toolkit";
import { setHideTabNav } from "./actions";
import { NavigationState } from "./types";

export const initialState: NavigationState = {
  hideTabNav: false,
};

export const navigationReducer = createReducer(initialState, (builder) =>
  builder.addCase(setHideTabNav, (state, { payload }) => {
    state.hideTabNav = payload;
  })
);
