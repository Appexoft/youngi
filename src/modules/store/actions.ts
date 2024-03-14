import { createAction } from "@reduxjs/toolkit";
import { PaymentInfo } from "./types";

export const setPaymentInfo = createAction<PaymentInfo>(
  "store/SET_PAYMENT_DATA"
);
