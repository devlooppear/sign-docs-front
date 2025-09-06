import {
  useMutation as useTanStackMutation,
  UseMutationResult,
} from "@tanstack/react-query";
import API from "@/common/utils/api";
import { UseMutationProps } from "./interface";

export function useMutation<TData = any, TVariables = any>({
  endpoint,
  method = "POST",
  config,
}: UseMutationProps<TData, TVariables>): UseMutationResult<
  TData,
  unknown,
  TVariables
> {
  return useTanStackMutation<TData, unknown, TVariables>({
    mutationFn: async (variables: TVariables) => {
      const response = await API.request<TData>({
        url: endpoint,
        method,
        data: variables,
      });
      return response.data;
    },
    ...config,
  });
}
