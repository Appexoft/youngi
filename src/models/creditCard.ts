export interface AddCreaditCatInterface {
  firstName: string;
  lastName: string;
  personID: string;
  cardNumber: number | null;
  cvc: number | null;
  date: string | null;
}

export interface MyCreditCard {
  uuid: string;
  customer: {
    name: string;
    email: string;
    phone: string;
    social_id: string;
  };
  payment: {
    display: string;
    expiry: string;
    brand: string;
    club: string;
    type: string;
    organization: string;
    origin_country: string;
  };
  buyer_key: string;
}
