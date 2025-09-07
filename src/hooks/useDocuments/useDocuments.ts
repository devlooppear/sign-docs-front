import { useQuery } from "../useQuery/useQuery";
import { endpoints } from "@/common/constants/endpoints";
import { DocumentStatus } from "@/enum/document-status";

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
  status: DocumentStatus;
  created_at: string;
  updated_at: string;
  url: string;
}

export interface DocumentsResponse {
  data: DocumentItem[];
  metadata: {
    page: number;
    size: number;
    totalItems: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

interface UseDocumentsParams {
  page?: number;
  limit?: number;
  status?: DocumentStatus;
}

export function useDocuments(params: UseDocumentsParams = {}) {
  const { page = 1, limit = 10, status } = params;

  const query = useQuery<{ data: DocumentItem[]; metadata: any }>({
    queryKey: ["documents", { page, limit, status }],
    endpoint: endpoints.documents.root,
    params: { page, limit, status },
  });

  const raw = query.data ?? {
    data: [],
    metadata: {
      page,
      size: limit,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  const mappedData: DocumentsResponse = {
    data: raw.data ?? [],
    metadata: raw.metadata ?? {
      page,
      size: limit,
      totalItems: 0,
      totalPages: 0,
      hasNextPage: false,
      hasPreviousPage: false,
    },
  };

  return {
    ...query,
    data: mappedData.data,
    metadata: mappedData.metadata,
  };
}
