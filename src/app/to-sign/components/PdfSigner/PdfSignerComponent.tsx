"use client";

import React, { useState, useRef, useEffect } from "react";
import dynamic from "next/dynamic";
import { Box, Typography } from "@mui/material";
import systemColors from "@/common/constants/systemColors";

const Document = dynamic(
  () => import("react-pdf").then((mod) => mod.Document),
  { ssr: false }
);
const Page = dynamic(() => import("react-pdf").then((mod) => mod.Page), {
  ssr: false,
});

interface PdfSignerProps {
  url: string;
  onClick: (page: number, x: number, y: number) => void;
  width?: number;
}

const PdfSignerComponent: React.FC<PdfSignerProps> = ({
  url,
  onClick,
  width = 800,
}) => {
  const [numPages, setNumPages] = useState<number>(0);
  const canvasRefs = useRef<Array<HTMLCanvasElement | null>>([]);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [containerWidth, setContainerWidth] = useState<number>(width);

  useEffect(() => {
    import("react-pdf").then((mod) => {
      mod.pdfjs.GlobalWorkerOptions.workerSrc = "/assets/pdf.worker.min.js";
    });
  }, []);

  useEffect(() => {
    const handleResize = () => {
      const newWidth = Math.min(width, window.innerWidth - 32);
      setContainerWidth(newWidth);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [width]);

  useEffect(() => {
    if (!containerRef.current) return;
    const resizeObserver = new ResizeObserver((entries) => {
      for (let entry of entries) {
        const newWidth = entry.contentRect.width;
        setContainerWidth(Math.min(newWidth, width));
      }
    });
    resizeObserver.observe(containerRef.current);
    return () => resizeObserver.disconnect();
  }, [width]);

  const handleLoadSuccess = (pdf: any) => setNumPages(pdf.numPages);

  const handleOverlayClick =
    (pageNumber: number) => (e: React.MouseEvent<HTMLDivElement>) => {
      const canvas = canvasRefs.current[pageNumber - 1];
      if (!canvas) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const xPercent = (x / rect.width) * 480;
      const yPercent = ((rect.height - y) / rect.height) * 850;

      onClick(
        pageNumber,
        Number(xPercent.toFixed(2)),
        Number(yPercent.toFixed(2))
      );
    };

  return (
    <Box ref={containerRef} sx={{ width: "100%", mx: "auto" }}>
      <Document file={url} onLoadSuccess={handleLoadSuccess}>
        {Array.from({ length: numPages }, (_, index) => (
          <Box
            key={`page_${index + 1}`}
            sx={{
              mb: 3,
              position: "relative",
              border: `1px solid ${systemColors.indigo[200]}`,
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Page
              pageNumber={index + 1}
              width={containerWidth}
              renderTextLayer={false}
              renderAnnotationLayer={false}
              onRenderSuccess={() => {
                const pageDiv = document.querySelector(
                  `[data-page-number="${index + 1}"]`
                ) as HTMLDivElement | null;
                if (pageDiv) {
                  const canvas = pageDiv.querySelector("canvas");
                  if (canvas)
                    canvasRefs.current[index] = canvas as HTMLCanvasElement;
                }
              }}
            />
            <Box
              sx={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100%",
                cursor: "crosshair",
              }}
              onClick={handleOverlayClick(index + 1)}
            />
            <Typography
              variant="caption"
              sx={{
                position: "absolute",
                bottom: 8,
                left: 8,
                backgroundColor: "rgba(255,255,255,0.8)",
                px: 1,
                borderRadius: 1,
                fontWeight: 500,
              }}
            >
              Clique para assinar - página {index + 1}
            </Typography>
          </Box>
        ))}
      </Document>
    </Box>
  );
};

export default PdfSignerComponent;
