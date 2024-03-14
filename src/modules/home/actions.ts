import { ChildInterface } from "./types";
import { createAction } from "@reduxjs/toolkit";
import { MallInterface, ShopInterface } from "~/models/home";

export const setActiveStore = createAction<ShopInterface>(
  "home/SET_ACTIVE_STORE"
);

export const setActiveMall = createAction<MallInterface>(
  "home/SET_ACTIVE_MALL"
);

export const setActiveChild = createAction<ChildInterface>(
  "home/SET_ACTIVE_CHILD"
);

export const setIsCardConnected = createAction<boolean>(
  "home/SET_IS_CARD_CONNECTED"
);
