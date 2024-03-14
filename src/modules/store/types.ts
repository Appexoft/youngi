import { ImageSourcePropType } from "react-native";

export interface StoreState {
  paymentInfo: {
    order_details: string | null;
    bussiness_id: number | null;
    payment: number | null;
    coupon_id: number | null;
  };
}

export interface PaymentInfo {
  [key: string]: string | ImageSourcePropType | null | undefined;
}
