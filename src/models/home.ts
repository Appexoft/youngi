export interface MallInterface {
  id: number;
  mall: string;
  businesses: BusinnessInterface[];
}

export interface BusinnessInterface {
  id: number;
  email: string;
  name: string;
  url: string;
  logo: string;
  description: string;
}

export interface ShopInterface {
  id: number;
  payable: boolean;
  active: boolean;
  phone: string;
  name: string;
  email: string;
  description: string;
  logo: string;
  image: string;
  logox2: string;
  imagex2: string;
  allowed: boolean;
}

export interface StoreInfoInteface {
  id: number;
  email: string;
  name: string;
  url: string;
  logo: string;
  description: string;
  coupons: CouponsInterface[];
}

export interface CouponsInterface {
  valid_from: string;
  valid_until: string;
  description: string;
  discount: number;
  name: string;
  coupon_types: {
    id: number;
    coupon_type: string;
  };
}

export interface ChildrenInteface {
  id: number;
  email: string;
  dob: number | null;
  phone: string;
  name: string;
  total_allowed_expenses: number;
  image: string | null;
  active: boolean;
  freeze: boolean;
  payable: boolean;
  created_at: string;
  updated_at: string;
  balance: number;
}

export interface BlockChildBusinessInterface {
  childId: number | null;
  businessId: number | null;
  block: boolean;
}

export interface PaymentRequestInterface {
  order_details: string | null;
  bussiness_id: number | null;
  payment: number | null;
  coupon_id: number | null;
}

export interface Transaction {
  id: number;
  bussiness_id: number;
  child_id: number;
  payment: number;
  payment_date: string;
  order_details: string;
  coupon_name: string | null;
  coupon_type: string | null;
  coupon_discount: string | null;
  coupon_description: string | null;
  payment_status: string;
  business_name: string;
  logo: string;
}
