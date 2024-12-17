import { api } from "@/core/services/axios/axios-instance";
import { AxiosRequestConfig, AxiosResponse } from "axios";
import appConfig from "../config";

export const httpGetService = <Result = any, Data = any>(
  url: string,
  config: AxiosRequestConfig<Data>,
  handleError?: boolean
): Promise<AxiosResponse<Result>> => {
  config.params.key = appConfig.apiKey;
  return api<Result>(
    { method: "GET", url: `${appConfig.baseUrl}/${url}`, ...config },
    handleError
  );
};

export const httpPostService = <Result = any, Data = any>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig<Data>,
  handleError?: boolean
): Promise<AxiosResponse<Result>> => {
  return api<Result>(
    {
      method: "POST",
      url: `${appConfig.baseUrl}/${url}`,
      data,
      ...config,
    },
    handleError
  );
};

export const httpPutService = <Result = any, Data = any>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig<Data>,
  handleError?: boolean
): Promise<AxiosResponse<Result>> => {
  return api<Result>(
    {
      method: "PUT",
      url: `${appConfig.baseUrl}/${url}`,
      data,
      ...config,
    },
    handleError
  );
};

export const httpDeleteService = <Result = any, Data = any>(
  url: string,
  data?: Data,
  config?: AxiosRequestConfig<Data>,
  handleError?: boolean
): Promise<AxiosResponse<Result, Data>> => {
  return api<Result>(
    {
      method: "DELETE",
      url: `${appConfig.baseUrl}/${url}`,
      data,
      ...config,
    },
    handleError
  );
};
