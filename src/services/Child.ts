import { ChildBudget } from "./../models/child";
import {
  MallInterface,
  PaymentRequestInterface,
  ShopInterface,
  StoreInfoInteface,
} from "./../models/home";
import { Api } from "./Api";

export class Child {
  static async inviteParent(phone: string): Promise<any> {
    const { data } = await Api.post<any>("/child/invite_parent", {
      phone,
    });

    return data;
  }

  static async acceptParentInvite(code: string): Promise<any> {
    const { data } = await Api.post<any>("/child/accept_parent_invite", {
      code,
    });

    return data;
  }

  static async setCode(code: string): Promise<any> {
    const { data } = await Api.patch<any>("/child/set_code", {
      code,
    });

    return data;
  }

  static async getMallsList(): Promise<MallInterface[]> {
    const { data } = await Api.get("/child/malls");

    return data;
  }

  static async getChildInfo(): Promise<any> {
    const { data } = await Api.get("/child");

    return data;
  }
  static async getShopList(id: number | null): Promise<ShopInterface[]> {
    const { data } = await Api.get(`/child/mall/${id}`);

    return data;
  }

  static async createPaymentRequest(
    params: PaymentRequestInterface
  ): Promise<any> {
    const { data } = await Api.post<any>("/child/send_payment", {
      ...params,
    });

    return data;
  }

  static async getStoreInfo(
    mallId: number | null,
    storeId: number | null
  ): Promise<StoreInfoInteface> {
    console.log(mallId, storeId);
    const { data } = await Api.get(
      `/child/mall/${mallId}/business_id/${storeId}`
    );

    return data;
  }

  static async getBalanceInfo(): Promise<ChildBudget> {
    const { data } = await Api.get<any>("/child/balance");

    return data;
  }
}
