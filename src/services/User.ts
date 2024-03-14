import {
  UserForgetPassword,
  UserLogin,
  UserResetPassword,
  UserVerifyCode,
} from "./../models/user";
import axios from "axios";
import { API_URL } from "~/constants/env";
import { UserProfileModel } from "~/models/user";
import { Api } from "./Api";

export class User {
  static async login(params: UserLogin): Promise<any> {
    return axios
      .post(
        `${API_URL}/auth/login`,
        JSON.stringify({
          email: params.email,
          password: params.password,
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
        return undefined;
      });
  }

  static async sendPhone(
    phone: string | null
  ): Promise<{ register_access_token: string }> {
    return await axios
      .post(
        `${API_URL}/auth/create_phone_validate_phone`,
        JSON.stringify({
          phone,
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

  static async verifyPhoneCode(phoneDetails: UserVerifyCode): Promise<any> {
    return axios
      .post(
        `${API_URL}/auth/check_validate_phone`,
        JSON.stringify({
          register_access_token: phoneDetails.phoneToken,
          phone: phoneDetails.phone,
          code: phoneDetails.code,
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
        return error.response;
      });
  }

  static async forgetPasword(params: UserForgetPassword): Promise<any> {
    return axios
      .post(
        `${API_URL}/auth/forget_password`,
        JSON.stringify({
          email: params.email,
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

  static async resetPasssword(params: UserResetPassword): Promise<any> {
    return axios
      .post(
        `${API_URL}/auth/reset_password`,
        JSON.stringify({
          code: params.code,
          password: params.password,
          passwordConfirm: params.passwordConfirm,
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

  static async registration(user: UserProfileModel): Promise<any> {
    return axios
      .post(
        `${API_URL}/auth/register`,
        JSON.stringify({
          name: user.name,
          email: user.email,
          phone: user.phone,
          password: user.password,
          passwordConfirm: user.passwordConfirm,
          role: user.role,
          active: user.active,
          payable: user.payable,
          phone_token: user.phoneToken,
        }),
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
        }
      )
      .then((res) => {
        return res;
      })
      .catch((error) => {
        return error;
      });
  }

  static async logout(): Promise<any> {
    const { data } = await Api.get(`/auth/logout`);

    return data;
  }

  static async deleteAccount(role: string): Promise<any> {
    const { data } = await Api.delete<any>(`/${role}/delete_account`);

    return data;
  }

  static createFromApi(data: any): UserProfileModel {
    return {
      name: data.name,
      email: data.email,
      phone: data.phone,
      password: data.password,
      passwordConfirm: data.passwordConfirm,
      role: data.role,
      active: data.active,
      payable: data.payable,
      phoneToken: data.phone_token,
    };
  }
}
