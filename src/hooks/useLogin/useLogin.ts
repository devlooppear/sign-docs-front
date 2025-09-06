import { useMutation } from "@/hooks/useMutation/useMutation";
import { endpoints } from "@/common/constants/endpoints";

export interface LoginVariables {
  email: string;
  password: string;
}

export interface LoginResponse {
  token: string;
  user: {
    id: string | number;
    name: string;
    role: string;
  };
}

export function useLogin(config = {}) {
  return useMutation<LoginResponse, LoginVariables>({
    endpoint: endpoints.auth.login,
    method: "POST",
    config,
  });
}
