import { createReducer } from "@reduxjs/toolkit";
import { setPaymentInfo } from "./actions";
import { StoreState } from "./types";

export const initialState: StoreState = {
  paymentInfo: {
    order_details: '',
    bussiness_id: null,
    payment: null,
    coupon_id: null,
  },
};

export const storeReducer = createReducer(initialState, (builder) =>
  builder.addCase(setPaymentInfo, (state, { payload }) => {
    state.paymentInfo = { ...state.paymentInfo, ...payload };
  })
);
