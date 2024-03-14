import { BlockChildBusinessInterface, Transaction } from "./../models/home";
import { ChildrenInteface, MallInterface, ShopInterface } from "~/models/home";
import { Api } from "./Api";
import axios from "axios";

export class Parent {
  static async inviteChild(phone: string): Promise<any> {
    const { data } = await Api.post<any>("/parent/invite_child", {
      phone,
    });

    return data;
  }

  static async sendPaymeSaleId(saleId: string): Promise<any> {
    const { data } = await Api.post<any>("/parent/set_payme_sale_id", {
      payme_sale_id: saleId,
    });

    return data;
  }

  static async acceptChildinvite(code: string): Promise<any> {
    const { data } = await Api.post<any>("/parent/accept_child_invite", {
      code,
    });

    return data;
  }

  static async setChildBudget(childId: number, limit: number): Promise<any> {
    const { data } = await Api.post(`/parent/expense_limit`, {
      child_id: childId,
      limit,
    });

    return data;
  }

  static async createCard(id?: number): Promise<any> {
    return axios
      .post(
        `https://live.payme.io/api/generate-sale`,
        JSON.stringify({
          currency: "ILS",
          language: "he",
          sale_type: "token",
          sale_price: 10000,
          product_name: "create-token",
          capture_buyer: true,
          transaction_id: id,
          seller_payme_id: "MPL16880-314837XP-KSSSXB7E-ETBSUPYL",
          installments: 1,

          sale_callback_url:
            "https://****api/payme_callbacks/sale_callback",
          sale_return_url: "https://*****",
        }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        return error;
      });
  }

  static async freezeChildAccount(childId: number): Promise<any> {
    const { data } = await Api.post(`/parent/freeze_child_account`, {
      child_id: childId,
      freeze: true,
    });

    return data;
  }

  static async addCard(
    cardToken: string,
    lastDigits: string,
    cardHolderName: string
  ): Promise<any> {
    const { data } = await Api.post(`/parent/add_card`, {
      payable: true,
      token: cardToken,
      last4digits: lastDigits,
      card_holder_name: cardHolderName,
      card_type: "visa",
    });

    return data;
  }

  static async getCreditCardInfo(): Promise<any> {
    const { data } = await Api.get(`/parent/credit_card_details`);

    return data;
  }

  static async getCreditCardBalance(): Promise<any> {
    const { data } = await Api.get(`/parent/balance`);

    return data;
  }

  static async getParentInfo(): Promise<any> {
    const { data } = await Api.get<any>("/parent");

    return data;
  }

  static async getChildrenList(): Promise<ChildrenInteface[]> {
    const { data } = await Api.get<any>("/parent/children");

    return data.map((item: ChildrenInteface) =>
      Parent.createListItemFromApi(item)
    );
  }

  static async getChild(): Promise<ChildrenInteface[]> {
    const { data } = await Api.get<any>("/parent/children");

    return data.map((item: ChildrenInteface) =>
      Parent.createListItemFromApi(item)
    );
  }

  static async getChildInfo(childId: number): Promise<ChildrenInteface> {
    const { data } = await Api.get<any>("/parent/children");

    return data.find((item: ChildrenInteface) => item.id === childId);
  }

  static async getMallsList(): Promise<MallInterface[]> {
    const { data } = await Api.get("/parent/malls");

    return data;
  }

  static async getChildMallsList(
    childId: number | null,
    mallId: number | null
  ): Promise<ShopInterface[]> {
    const { data } = await Api.get(`/parent/child/${childId}/mall/${mallId}`);

    return data;
  }

  static async blockChildBusiness(
    params: BlockChildBusinessInterface
  ): Promise<ShopInterface[]> {
    const { data } = await Api.post("/parent/block_child_business", {
      child_id: params.childId,
      business_id: params.businessId,
      block: params.block,
    });

    return data;
  }

  static async getAllTransactions(): Promise<Transaction[]> {
    const { data } = await Api.get(`/parent/transactions`);

    return data;
  }

  static async getTransactionsById(childId: number): Promise<Transaction[]> {
    console.log(childId, "childId");
    const { data } = await Api.get(`/parent/transactions_by_child/${childId}`);

    return data;
  }

  static createListItemFromApi(data: any): ChildrenInteface {
    return {
      id: data.id,
      email: data.email,
      dob: data.dob,
      phone: data.phone,
      name: data.name,
      total_allowed_expenses: data.total_allowed_expenses,
      image: data.image,
      active: data.active,
      freeze: data.freeze,
      payable: data.payable,
      created_at: data.created_at,
      updated_at: data.id,
      balance: data.balance,
    };
  }
}
