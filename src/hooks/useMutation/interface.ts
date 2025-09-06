export interface UseMutationProps<TData, TVariables> {
  endpoint: string;
  method?: "POST" | "PATCH" | "DELETE";
  config?: any;
}
