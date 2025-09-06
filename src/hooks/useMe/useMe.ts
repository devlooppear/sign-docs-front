
import { useQuery } from "@/hooks/useQuery/useQuery";
import { endpoints } from "@/common/constants/endpoints";

export interface UserMe {
  id: string | number;
  name: string;
  email: string;
  role: string;
  person_type: string;
  document_number: string;
  created_at: string;
  updated_at: string;
}

export function useMe() {
  const { data, isLoading, isError, error, refetch } = useQuery<UserMe>({
    queryKey: ["me"],
    endpoint: endpoints.user.me,
  });
  return {
    user: data,
    isLoading,
    isError,
    error,
    refetch,
  };
}
