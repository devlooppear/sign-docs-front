
import { useMutation } from "@/hooks/useMutation/useMutation";
import { endpoints } from "@/common/constants/endpoints";

export interface RegisterVariables {
  name: string;
  email: string;
  password: string;
  document_number: string;
  person_type?: string;
  role?: string;
}

export interface RegisterResponse {
  id: string | number;
  name: string;
  email: string;
  role: string;
  person_type: string;
  document_number: string;
  created_at: string;
  updated_at: string;
}

export function useRegister() {
  const mutation = useMutation<RegisterResponse, RegisterVariables>({
    endpoint: endpoints.user.register,
    method: "POST",
  });
  return {
    register: mutation.mutate,
    registerAsync: mutation.mutateAsync,
    data: mutation.data,
    isPending: mutation.isPending,
    isError: mutation.isError,
    error: mutation.error,
  };
}
