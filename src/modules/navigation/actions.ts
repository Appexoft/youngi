import { createAction } from "@reduxjs/toolkit";

export const setHideTabNav = createAction<boolean>(
  "naigation/SET_HIDE_TAB_NAV"
);
