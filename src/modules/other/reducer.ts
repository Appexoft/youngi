import { OtherState } from "./types";
import {
  setRefetchChildData,
  setRefetchMyChildren,
  setReloadChildBudget,
} from "./actions";
import { createReducer } from "@reduxjs/toolkit";

export const initialState: OtherState = {
  reloadChildBudget: false,
  refetchMyChildren: false,
  refetchChildData: false,
};

export const otherReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setReloadChildBudget, (state, { payload }) => {
      state.reloadChildBudget = payload;
    })
    .addCase(setRefetchMyChildren, (state, { payload }) => {
      state.refetchMyChildren = payload;
    })
    .addCase(setRefetchChildData, (state, { payload }) => {
      state.refetchChildData = payload;
    })
);
