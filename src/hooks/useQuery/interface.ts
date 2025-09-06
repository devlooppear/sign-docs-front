import { QueryKey } from "@tanstack/react-query";
import axios, { AxiosRequestConfig } from "axios";

export interface UseQueryProps<T> {
  queryKey: QueryKey;
  endpoint: string;
  params?: AxiosRequestConfig["params"];
  cacheTime?: number | null;
  enabled?: boolean;
  axiosInstance?: typeof axios;
}
