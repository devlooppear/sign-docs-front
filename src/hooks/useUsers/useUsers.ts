
import { useQuery } from "@/hooks/useQuery/useQuery";
import { endpoints } from "@/common/constants/endpoints";

export interface User {
  id: string | number;
  name: string;
  email: string;
  role: string;
  person_type: string;
  document_number: string;
  created_at: string;
  updated_at: string;
}

export function useUsers() {
  const { data, isLoading, isError, error, refetch } = useQuery<User[]>({
    queryKey: ["users"],
    endpoint: endpoints.user.root,
  });
  return {
    users: data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
