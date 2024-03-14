export interface UserProfileModel {
  name: string;
  email: string;
  phone: string | null;
  password: string;
  passwordConfirm: string;
  role: string | null;
  active: boolean;
  payable: boolean;
  phoneToken: string | null;
}

export interface UserVerifyCode {
  phoneToken: string | null;
  phone: string | null;
  code: string | null;
}

export interface UserForgetPassword {
  email: string;
  role: string;
}

export interface UserResetPassword {
  code: string;
  password: string;
  passwordConfirm: string;
}

export interface UserLogin {
  email: string;
  password: string;
}

export interface ParentInfoInterface {
  password: string;
  id: number;
  active: boolean;
  token: null;
  created_at: string;
  updated_at: string;
  name: string;
  phone: string;
  email: string;
  payable: boolean;
  image: string | null;
  card_holder_name: string | null;
  card_type: string | null;
}
