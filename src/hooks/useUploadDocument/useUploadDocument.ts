import { useRequest } from "../useRequest/useRequest";
import { endpoints } from "@/common/constants/endpoints";

export interface UploadedBy {
  id: number;
  name: string;
  email: string;
  role: string;
  person_type: string;
  document_number: string;
  created_at: string;
  updated_at: string;
}

export interface DocumentResponse {
  id: number;
  name: string;
  file_path: string;
  uploaded_by: UploadedBy;
  status: string;
  created_at: string;
  updated_at: string;
  url?: string;
}

export interface UploadDocumentBody {
  file: File;
}


export function useUploadDocument() {
  const { request, loading, error, data } = useRequest();

  const upload = async (body: UploadDocumentBody) => {
    const formData = new FormData();
    formData.append("file", body.file);
    return await request({
      url: endpoints.documents.root,
      method: "POST",
      data: formData,
    });
  };

  return { upload, loading, error, data };
}
