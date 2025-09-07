declare module 'pdf-viewer-reactjs' {
  import * as React from 'react';

  interface PDFViewerProps {
    document: { url: string };
    onPageClick?: (page: number, x: number, y: number) => void;
    hideNavbar?: boolean;
    css?: React.CSSProperties;
  }

  const PDFViewer: React.FC<PDFViewerProps>;
  export default PDFViewer;
}
