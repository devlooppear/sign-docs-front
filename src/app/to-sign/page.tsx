"use client";

import { useEffect, useState } from "react";
import {
  Typography,
  Divider,
  Box,
  Alert,
  CircularProgress,
} from "@mui/material";
import { useTranslation } from "react-i18next";
import systemColors from "@/common/constants/systemColors";
import { StyledCard } from "@/components/StyledCard/StyledCard";
import { UploadDocumentForm } from "./components/UploadDocumentForm/UploadDocumentForm";
import { SignDocsSteps } from "@/enum/sign-docs";
import { useAssignDocument } from "@/hooks/useAssignDocument/useAssignDocument";
import { PdfSigner } from "./components/PdfSigner/PdfSigner";
import { Done } from "./components/Done/Done";

const STORAGE_KEY = "sign-docs-step";
const DOCUMENT_STORAGE_KEY = "sign-docs-document";

interface SignaturePosition {
  page: number;
  x: number;
  y: number;
  assinatura?: any;
}

interface DocumentType {
  id: number;
  url: string;
  signedFilePath?: string;
  signedUrl?: string;
}

const ToSignPage: React.FC = () => {
  const { t } = useTranslation("to-sign");

  const [step, setStep] = useState<SignDocsSteps>(SignDocsSteps.UPLOAD);
  const [document, setDocument] = useState<DocumentType | null>(null);
  const [signatures, setSignatures] = useState<SignaturePosition[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [documentAssign, setDocumentAssign] = useState<DocumentType | null>(
    null
  );

  useEffect(() => {
    try {
      const savedStep = localStorage.getItem(STORAGE_KEY);
      const savedDocument = localStorage.getItem(DOCUMENT_STORAGE_KEY);

      if (
        savedStep &&
        Object.values(SignDocsSteps).includes(savedStep as SignDocsSteps)
      ) {
        setStep(savedStep as SignDocsSteps);
      }
      if (savedDocument) setDocument(JSON.parse(savedDocument));
    } catch (err) {
      console.error("Erro ao restaurar estado:", err);
      localStorage.removeItem(STORAGE_KEY);
      localStorage.removeItem(DOCUMENT_STORAGE_KEY);
    }
  }, []);

  useEffect(() => localStorage.setItem(STORAGE_KEY, step), [step]);
  useEffect(() => {
    if (document)
      localStorage.setItem(DOCUMENT_STORAGE_KEY, JSON.stringify(document));
    else localStorage.removeItem(DOCUMENT_STORAGE_KEY);
  }, [document]);

  const { mutate: assignDocument, isPending: isAssigning } =
    useAssignDocument();

  const handleSign = (page: number, x: number, y: number) => {
    if (!document?.id) {
      setError(t("document_not_found"));
      return;
    }

    setError(null);
    const newSignature: SignaturePosition = { page, x, y };
    setSignatures((prev) => [...prev, newSignature]);

    assignDocument(
      { documentId: document.id, page, x, y },
      {
        onSuccess: (response: any) => {
          const updatedDoc: DocumentType = {
            ...document,
            signedFilePath: response.file_path,
            signedUrl: response.url,
          };
          setDocumentAssign(updatedDoc);

          setSignatures((prev) =>
            prev.map((sig) =>
              sig.page === page && sig.x === x && sig.y === y
                ? { ...sig, assinatura: response.assinatura }
                : sig
            )
          );

          setStep(SignDocsSteps.DONE);
          localStorage.removeItem(STORAGE_KEY);
          localStorage.removeItem(DOCUMENT_STORAGE_KEY);
        },
        onError: (err: any) => {
          setError(err?.message || t("signature_error"));
          setSignatures((prev) =>
            prev.filter(
              (sig) => !(sig.page === page && sig.x === x && sig.y === y)
            )
          );
        },
      }
    );
  };

  const handleRestart = () => {
    setStep(SignDocsSteps.UPLOAD);
    setDocument(null);
    setDocumentAssign(null);
    setSignatures([]);
    setError(null);
    localStorage.removeItem(STORAGE_KEY);
    localStorage.removeItem(DOCUMENT_STORAGE_KEY);
  };

  const renderStep = () => {
    switch (step) {
      case SignDocsSteps.UPLOAD:
        return (
          <UploadDocumentForm setStep={setStep} setDocument={setDocument} />
        );

      case SignDocsSteps.SIGN:
        return (
          <Box>
            <Typography
              variant="h6"
              color={systemColors.indigo[700]}
              sx={{ mb: 2 }}
            >
              {t("signature_step")}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              {t("click_to_sign_instructions")}
            </Typography>

            {signatures.length > 0 && (
              <Alert severity="info" sx={{ mb: 2 }}>
                {t("signatures_positioned", { count: signatures.length })}
                <ul style={{ margin: 8, paddingLeft: 20 }}>
                  {signatures.map((sig, idx) => (
                    <li key={idx}>
                      {t("page")} {sig.page}: (X: {sig.x.toFixed(2)}%, Y:{" "}
                      {sig.y.toFixed(2)}%)
                    </li>
                  ))}
                </ul>
              </Alert>
            )}

            <Box sx={{ position: "relative" }}>
              {isAssigning && (
                <Box
                  sx={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: "rgba(255,255,255,0.8)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000,
                    borderRadius: 2,
                  }}
                >
                  <Box sx={{ textAlign: "center" }}>
                    <CircularProgress sx={{ mb: 2 }} />
                    <Typography>{t("processing_signature")}</Typography>
                  </Box>
                </Box>
              )}

              {document && (
                <PdfSigner
                  url={document.url}
                  onClick={handleSign}
                  width={800}
                />
              )}
            </Box>
          </Box>
        );

      case SignDocsSteps.DONE:
        return (
          <Done
            signedUrl={documentAssign?.signedUrl || ""}
            onRestart={handleRestart}
          />
        );

      default:
        return null;
    }
  };

  return (
    <StyledCard>
      <Typography variant="h4" color={systemColors.indigo[800]}>
        {t("title")}
      </Typography>
      <Divider sx={{ borderColor: systemColors.indigo[200], mb: 2 }} />
      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError(null)}>
          {error}
        </Alert>
      )}
      {renderStep()}
    </StyledCard>
  );
};

export default ToSignPage;
