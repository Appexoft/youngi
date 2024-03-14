export type RootStackParamList = {
  InitialScreen: undefined;
  SignUp: {
    step?: number;
  };
  SignIn: undefined;
  ForgotPassword: undefined;
  AddChild: undefined;

  HomeScreen: undefined;
  StoreScreen: {
    storeId: number;
  };
  ProductDetails: undefined;
  SecretPin: undefined;
  ConnectParentStack: undefined;
  AddCreditCard: {
    url: string;
  };
  ChildScreen: {
    childId: number;
  };
  ChildPermissions: {
    childId: number;
    childName: string;
  };
  MonthlyBudget: {
    childId: number;
  };
};

export type ConnectParentStackParamList = {
  IntrodactionScreen: undefined;
  InviteScreen: undefined;
  InvitationSend: undefined;
  EnterInvitePhone: undefined;
  EnterInviteCode: undefined;
  SuccessfullyConnect: {
    name: string;
  };
  UnsuccessfullyConnect: undefined;
};
