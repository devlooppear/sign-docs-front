"use client";

import dynamic from "next/dynamic";

export const PdfSigner = dynamic(() => import("./PdfSignerComponent"), {
  ssr: false,
});
