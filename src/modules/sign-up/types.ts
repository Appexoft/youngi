export interface SignUpState {
  activeStep: number;
  registrationInfo: {
    name: string | null;
    email: string | null;
    phone: string | null;
    password: string | null;
    passwordConfirm: string | null;
    role: string | null;
    active: boolean | null;
    payable: boolean | null;
    phoneToken: string | null;
  };
  tempToken: string | null;
}

export interface UserInfo {
  [key: string]: any;
}
