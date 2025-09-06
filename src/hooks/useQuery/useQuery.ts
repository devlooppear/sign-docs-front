"use client";

import { useQuery as useTanStackQuery } from "@tanstack/react-query";
import API from "@/common/utils/api";
import { UseQueryProps } from "./interface";

export function useQuery<T>({
  queryKey,
  endpoint,
  params,
  cacheTime,
  enabled = true,
}: UseQueryProps<T>) {
  const query = useTanStackQuery<T>({
    queryKey: Array.isArray(queryKey) ? queryKey : [queryKey],
    queryFn: async () => {
      const { data } = await API.get<T>(endpoint, { params });
      return data;
    },
    staleTime: cacheTime ?? undefined,
    refetchOnWindowFocus: false,
    enabled,
  });

  return {
    data: query.data,
    isLoading: query.isLoading,
    isError: query.isError,
    error: query.error,
    refetch: query.refetch,
  };
}
