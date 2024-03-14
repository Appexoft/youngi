import axios, {
  AxiosError,
  AxiosInstance,
  AxiosPromise,
  AxiosRequestConfig,
  AxiosResponse,
} from "axios";

import { setAuth, signOut } from "~/modules/user/actions";
import { store } from "~/store";
import { API_URL, REFRESH_TOKEN_URL } from "~/constants/env";
import AsyncStorage from "@react-native-async-storage/async-storage";

let isRefreshing = false;
let failedQueue: any = [];

const processQueue = (error: AxiosError | null, token: string): void => {
  failedQueue.forEach((prom: any) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });

  failedQueue = [];
};

const setTokenInterceptors = (instance: AxiosInstance): void => {
  instance.interceptors.request.use(
    (config: AxiosRequestConfig) => {
      const token = store.getState().user.accessToken;
      // const token = AsyncStorage.getItem("token");

      if (token) {
        if (!config.headers) {
          config.headers = {};
        }
        config.headers.Authorization = `Bearer ${token}`;
      }
      return config;
    },
    (error) => {
      return Promise.reject(error);
    }
  );
  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      const originalRequest = error.config;

      if (error.response.status === 401 && !originalRequest.retry) {
        if (isRefreshing) {
          return new Promise((resolve, reject) => {
            failedQueue.push({ resolve, reject });
          })
            .then((token) => {
              originalRequest.headers.Authorization = `Bearer ${token}`;
              return instance(originalRequest);
            })
            .catch((err) => {
              return Promise.reject(err);
            });
        }

        originalRequest.retry = true;
        isRefreshing = true;

        store.dispatch(signOut());
      }

      return Promise.reject(error);
    }
  );
};

export class Api {
  static instance: Api;

  axiosInstance: AxiosInstance;

  constructor() {
    this.axiosInstance = axios.create({
      timeout: 30000,
      baseURL: API_URL,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
    });
    setTokenInterceptors(this.axiosInstance);
  }

  static getInstance(): Api {
    if (!Api.instance) {
      Api.instance = new Api();
    }
    return Api.instance;
  }

  static getAxios(): AxiosInstance {
    return Api.getInstance().axiosInstance;
  }

  static get<T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise<T> {
    return Api.getAxios().get(url, { params, ...config });
  }

  static delete<T = any>(
    url: string,
    params: Record<string, any> = {},
    config: AxiosRequestConfig = {}
  ): AxiosPromise<T> {
    return Api.getAxios().delete(url, { params, ...config });
  }

  static post<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return Api.getAxios().post(url, data, config);
  }

  static put<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return Api.getAxios().put(url, data, config);
  }

  static patch<T = any>(
    url: string,
    data?: Record<string, any>,
    config?: AxiosRequestConfig
  ): AxiosPromise<T> {
    return Api.getAxios().patch(url, data, config);
  }
}
