"use client";

import { useRouter } from "next/navigation";
import { useCallback } from "react";

export function useNavTo() {
  const router = useRouter();

  const navTo = useCallback(
    (path: string, options?: { replace?: boolean }) => {
      if (options?.replace) {
        router.replace(path);
      } else {
        router.push(path);
      }
    },
    [router]
  );

  return { navTo };
}
