import { useMutation } from '../useMutation/useMutation';
import { endpoints } from '@/common/constants/endpoints';

export interface DeleteDocumentResponse {
  message: string;
}

export function useDeleteDocument(documentId?: string | number, config?: any) {
  return useMutation<DeleteDocumentResponse>({
    endpoint: documentId ? endpoints.documents.byId(documentId) : '',
    method: 'DELETE',
    config,
  });
}
