"use client";

import React from "react";
import { Box, Typography } from "@mui/material";
import { FaExclamationTriangle } from "react-icons/fa";
import StyledButton from "@/components/StyledButton/StyledButton";

import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";
import { useTranslation } from "react-i18next";

const NotFoundPage: React.FC = () => {

  const { navTo } = useNavTo();
  const { t } = useTranslation("common");

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "78vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        background: systemColors.indigo[50],
        px: 2,
      }}
    >
      <FaExclamationTriangle size={100} color={systemColors.indigo[700]} />
      <Typography
        variant="h2"
        sx={{
          color: systemColors.indigo[800],
          fontWeight: "bold",
          mt: 2,
        }}
      >
        {t("notFound.title", "404")}
      </Typography>
      <Typography
        variant="h5"
        sx={{
          color: systemColors.indigo[600],
          mt: 1,
          textAlign: "center",
          maxWidth: 400,
        }}
      >
        {t("notFound.subtitle", "Ops! A página que você está procurando não existe ou foi movida.")}
      </Typography>

      <StyledButton
        label={t("notFound.button", "Voltar para Home")}
        variant="contained"
        sx={{ mt: 4 }}
        onClick={() => navTo(Routes.HOME)}
      />
    </Box>
  );
};

export default NotFoundPage;
