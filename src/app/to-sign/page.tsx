"use client";

import { Typography, Divider } from "@mui/material";
import { useTranslation } from "react-i18next";
import systemColors from "@/common/constants/systemColors";
import { StyledCard } from "@/components/StyledCard/StyledCard";
import { UploadDocumentForm } from "./components/UploadDocumentForm/UploadDocumentForm";

const ToSignPage: React.FC = () => {
  const { t } = useTranslation("to-sign");

  return (
    <StyledCard>
      <Typography variant="h4" color={systemColors.indigo[800]}>
        {t("title")}
      </Typography>

      <Divider sx={{ borderColor: systemColors.indigo[200] }} />

      <UploadDocumentForm />
    </StyledCard>
  );
};

export default ToSignPage;
