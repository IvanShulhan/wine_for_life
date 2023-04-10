/* eslint-disable @typescript-eslint/no-unused-vars */
import axios, { AxiosStatic } from 'axios';
import { STORAGE_KEYS } from '../common/consts/app-keys.const';
import { IHttpConfig } from '../common/types/config.type';

class HttpSerivce {
  baseUrl: string;

  fetchingService: AxiosStatic;

  constructor(baseUrl = process.env.REACT_APP_SERVER_URL, fetchingService = axios) {
    this.baseUrl = baseUrl || '';
    this.fetchingService = fetchingService;
  }

  private getFullApiUrl(url: string) {
    return `${this.baseUrl}/${url}`;
  }

  private populateTokenToHeaderConfig() {
    return {
      Authorization: localStorage.getItem(STORAGE_KEYS.TOKEN)
    };
  }

  private extractUrlAndDataFromConfig({ data, url, ...configWithoutDataAndUrl }: IHttpConfig) {
    return configWithoutDataAndUrl;
  }

  private setConfigHeaderWithAuth(config: IHttpConfig, withAuth: boolean) {
    if (withAuth) {
      config.headers = {
        ...config.headers,
        ...this.populateTokenToHeaderConfig()
      };
    }
  }

  get<M>(config: IHttpConfig, withAuth = true) {
    this.setConfigHeaderWithAuth(config, withAuth);

    return this.fetchingService.get<M>(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }

  post<M, R>(config: IHttpConfig, withAuth = true) {
    this.setConfigHeaderWithAuth(config, withAuth);

    return this.fetchingService.post<M, R>(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  put<M, R>(config: IHttpConfig, withAuth = true) {
    this.setConfigHeaderWithAuth(config, withAuth);

    return this.fetchingService.put<M, R>(
      this.getFullApiUrl(config.url),
      config.data,
      this.extractUrlAndDataFromConfig(config)
    );
  }

  delete(config: IHttpConfig, withAuth = true) {
    this.setConfigHeaderWithAuth(config, withAuth);

    return this.fetchingService.delete(
      this.getFullApiUrl(config.url),
      this.extractUrlAndDataFromConfig(config)
    );
  }
}

export default HttpSerivce;
