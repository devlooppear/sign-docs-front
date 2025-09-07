import { useCallback, useState } from "react";
import api from "@/common/utils/api";

interface UseRequestOptions {
  method?: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  data?: any;
  params?: any;
  headers?: Record<string, string>;
  onSuccess?: (data: any) => void;
  onError?: (error: any) => void;
}

export function useRequest() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [response, setResponse] = useState<any>(null);

  const request = useCallback(async (options: UseRequestOptions) => {
    setLoading(true);
    setError(null);
    setResponse(null);
    try {
      const res = await api.request({
        method: options.method || "GET",
        url: options.url,
        data: options.data,
        params: options.params,
        headers: options.headers,
      });
      setResponse(res.data);
      options.onSuccess?.(res.data);
      return res.data;
    } catch (err: any) {
      setError(err);
      options.onError?.(err);
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  return { request, loading, error, response, data: response };
}
