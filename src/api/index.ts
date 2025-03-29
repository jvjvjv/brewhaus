import axios from "axios";
import type { AxiosRequestConfig } from "axios";

import type { IBrewery, IBreweryQuery } from "@/types";

import { getApiQueryString } from "./ApiQuery";

const options: AxiosRequestConfig = {
  baseURL: "https://api.openbrewerydb.org/v1",
};

const apiCall = async <T>(
  method: string,
  url: string,
  body?: unknown
): Promise<T> => {
  const response = await axios<T>({
    ...options,
    method,
    url,
    data: body,
  });
  if (response.status !== 200) {
    // There should be more to this, but for now throwing an error should suffice
    throw new Error(`Error: ${response.status}`);
  }
  return response.data;
};

export const getBrewery = async (id: string): Promise<IBrewery> =>
  await apiCall<IBrewery>("get", `breweries/${id}`);

export const getBreweries = async (
  queries?: IBreweryQuery
): Promise<IBrewery[]> =>
  await apiCall("get", `breweries${getApiQueryString(queries ?? {})}`);

export const searchBreweries = async (query: string): Promise<IBrewery[]> =>
  await apiCall("get", `breweries/search?query=${query}`);

export const getIpsum = async (): Promise<string[]> =>
  await apiCall<string[]>(
    "get",
    "https://baconipsum.com/api/?type=meat-and-filler&paras=1&start-with-lorem=1&format=json"
  );
