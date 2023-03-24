import { AxiosRequestConfig } from 'axios';

export interface IHttpConfig extends AxiosRequestConfig {
  url: string;
}
