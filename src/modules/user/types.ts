export interface UserState {
  accessToken: string | null;
  user: IUser;
  info: IChildInfo | IParentInfo | null;
  resetPasswordEmail: string;
}

export interface IUser {
  email: string;
  role: string | null;
}

export interface IChildInfo {
  active: boolean;
  balance: number;
  created_at: string;
  dob: null | string;
  email: string;
  freeze: boolean;
  id: number;
  image: string;
  name: string;
  parent_id: number;
  payable: boolean;
  phone: string;
  total_allowed_expenses: number;
  updated_at: string;
  code: string;
}

export interface IParentInfo {
  active: boolean;
  card_holder_name: null | string;
  card_type: null | string;
  created_at: string;
  email: string;
  id: number;
  image: null | string;
  last4digits: null | string;
  name: string;
  password: string;
  payable: boolean;
  phone: string;
  token: string;
  updated_at: string;
}
