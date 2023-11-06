/**
 * This file "Adapts" axios to the `api.weatherapi.com`.
 * To make it an actual adapter this file should be implementing a
 * defined interface, but we can ignore the complexity for now
 *
 * It exports only the GET method for now, I didn't add the rest of the
 * REST methods as they are not needed at the moment
 *
 * This adaptor separates the "network client" (axios at the moment) from
 * the rest of the app. This allows changing the client at any point in
 * the future (say to Apollo) without affecting the rest of the app.
 */
import axios, { AxiosRequestConfig } from 'axios';

import { APIGuard } from './API.d';

const WeatherAPI = axios.create({
  baseURL: 'http://api.weatherapi.com/v1/',
  headers: { 'Content-Type': 'application/json' },
});

// Interceptor: Add default headers & data
WeatherAPI.interceptors.request.use((config) => {
  if (config.method === 'get') {
    // eslint-disable-next-line no-param-reassign
    config.params = {
      // FIXME: API keys should be hidden, but for this demo we can ignore
      key: 'fd1faefdffeb4799971135337230511',
      ...config.params,
    };
  }

  return config;
});

export function get<T>(url: string, config?: AxiosRequestConfig<any>) {
  return WeatherAPI.get<APIGuard<T>>(url, config);
}
