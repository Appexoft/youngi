import { createReducer } from "@reduxjs/toolkit";
import {
  setActiveChild,
  setActiveMall,
  setActiveStore,
  setIsCardConnected,
} from "./actions";
import { HomeState } from "./types";

export const initialState: HomeState = {
  activeStore: null,
  activeMall: {
    id: null,
    mall: null,
    businesses: null,
  },
  activeChild: {
    id: null,
    image: null,
    name: null,
  },
  isCardConnected: false,
};

export const homeReducer = createReducer(initialState, (builder) =>
  builder
    .addCase(setActiveStore, (state, { payload }) => {
      state.activeStore = { ...state.activeStore, ...payload };
    })
    .addCase(setActiveMall, (state, { payload }) => {
      state.activeMall = { ...state.activeMall, ...payload };
    })
    .addCase(setActiveChild, (state, { payload }) => {
      state.activeChild = payload;
    })
    .addCase(setIsCardConnected, (state, { payload }) => {
      state.isCardConnected = payload;
    })
);
