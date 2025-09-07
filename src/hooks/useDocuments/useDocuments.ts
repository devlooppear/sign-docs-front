import { useQuery } from '../useQuery/useQuery';
import { endpoints } from '@/common/constants/endpoints';

export interface DocumentItem {
  id: number;
  name: string;
  file_path: string;
  uploaded_by: {
    id: number;
    name: string;
    email: string;
    role: string;
    person_type: string;
    document_number: string;
  };
  status: string;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface DocumentsResponse {
  data: DocumentItem[];
  metadata?: {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export function useDocuments(params?: { page?: number; limit?: number; status?: string }) {
  const query = useQuery<{ data?: DocumentItem[]; metadata?: any }>({
    queryKey: ['documents', params],
    endpoint: endpoints.documents.root,
    params,
  });

  const raw = query.data ?? {};

  const mappedData: DocumentsResponse = {
    data: Array.isArray(raw) ? raw : raw.data ?? [],
    metadata: Array.isArray(raw) ? undefined : raw.metadata,
  };

  return {
    ...query,
    data: mappedData.data,
    metadata: mappedData.metadata,
  };
}
