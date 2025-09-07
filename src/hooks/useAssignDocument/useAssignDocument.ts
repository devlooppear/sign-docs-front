import { useMutation } from '../useMutation/useMutation';
import { endpoints } from '@/common/constants/endpoints';

export interface AssignDocumentBody {
  documentId: number;
  page: number;
  x: number;
  y: number;
}

export interface AssignDocumentResponse {
  message: string;
  assinatura: {
    id: number;
    nome: string;
    tipo: string;
    documento: string;
    hash: string;
    data: string;
  };
  file_path: string;
  url: string;
}

export function useAssignDocument(config?: any) {
  return useMutation<AssignDocumentResponse, AssignDocumentBody>({
    endpoint: endpoints.documents.assign,
    method: 'POST',
    config,
  });
}
