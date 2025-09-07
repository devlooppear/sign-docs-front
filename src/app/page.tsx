"use client";

import React from "react";
import { Box, Typography, Divider } from "@mui/material";
import {
  FaFileSignature,
  FaTachometerAlt,
  FaFileAlt,
  FaUserCircle,
} from "react-icons/fa";
import StyledButton from "@/components/StyledButton/StyledButton";
import StyledCardContainer from "@/components/StyledCardContainer/StyledCardContainer";
import { useMe } from "@/hooks/useMe/useMe";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { Routes } from "@/common/constants/routes";
import systemColors from "@/common/constants/systemColors";
import { UserRole } from "@/enum/userRole";
import { useTranslation } from "react-i18next";
import Loader from "@/components/Loader/Loader";

interface HomeOption {
  label: string;
  description: string;
  route: string;
  buttonLabel: string;
  icon: React.ReactNode;
}

const HomePage: React.FC = () => {
  const { user, isLoading } = useMe();
  const { navTo } = useNavTo();

  const { t } = useTranslation("home");

  if (isLoading) {
    return <Loader inAll />;
  }

  const options: HomeOption[] =
    user?.role === UserRole.CLIENT
      ? [
          {
            label: t("toSign.label", "Documentos para Assinar"),
            route: Routes.TO_SIGN,
            description: t(
              "toSign.description",
              "Veja os documentos pendentes e assine de forma rápida e segura."
            ),
            buttonLabel: t("toSign.buttonLabel", "Assinar Documentos"),
            icon: (
              <FaFileSignature size={40} color={systemColors.indigo[700]} />
            ),
          },
          {
            label: t("documents.label", "Meus Documentos"),
            route: Routes.DOCUMENT,
            description: t(
              "documents.description",
              "Acesse todos os documentos que você possui no sistema."
            ),
            buttonLabel: t("documents.buttonLabel", "Ver Documentos"),
            icon: <FaFileAlt size={40} color={systemColors.indigo[700]} />,
          },
          {
            label: t("profile.label", "Perfil"),
            route: Routes.PROFILE,
            description: t(
              "profile.description",
              "Atualize suas informações e configure sua conta."
            ),
            buttonLabel: t("profile.buttonLabel", "Ver Perfil"),
            icon: <FaUserCircle size={40} color={systemColors.indigo[700]} />,
          },
        ]
      : [
          {
            label: t("dashboard.label", "Painel"),
            route: Routes.DASHBOARD,
            description: t(
              "dashboard.description",
              "Acompanhe métricas e informações importantes do sistema."
            ),
            buttonLabel: t("dashboard.buttonLabel", "Ir ao Painel"),
            icon: (
              <FaTachometerAlt size={40} color={systemColors.indigo[700]} />
            ),
          },
          {
            label: t("documents.label", "Documentos"),
            route: Routes.DOCUMENT,
            description: t(
              "documents.description",
              "Gerencie e visualize todos os documentos do sistema."
            ),
            buttonLabel: t("documents.buttonLabel", "Ver Documentos"),
            icon: <FaFileAlt size={40} color={systemColors.indigo[700]} />,
          },
          {
            label: t("profile.label", "Perfil"),
            route: Routes.PROFILE,
            description: t(
              "profile.description",
              "Atualize suas informações e configure sua conta."
            ),
            buttonLabel: t("profile.buttonLabel", "Ver Perfil"),
            icon: <FaUserCircle size={40} color={systemColors.indigo[700]} />,
          },
        ];

  return (
    <Box
      sx={{
        width: "100%",
        minHeight: "80vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "flex-start",
        px: 2,
        pt: 2,
        pb: 4,
      }}
    >
      <StyledCardContainer
        sx={{
          maxWidth: 900,
          p: 4,
          display: "flex",
          flexDirection: "column",
          gap: 4,
          background: systemColors.indigo[50],
          boxShadow: `0px 6px 20px ${systemColors.indigo[200]}`,
        }}
      >
        <Box display="flex" alignItems="center" gap={2}>
          <FaUserCircle size={50} color={systemColors.indigo[700]} />
          <Typography
            variant="h4"
            sx={{ color: systemColors.indigo[800], fontWeight: "bold" }}
          >
            {t("greeting", "Olá, {{name}}!", {
              name: user?.name || t("visitor", "Visitante"),
            })}
          </Typography>
        </Box>

        <Divider sx={{ borderColor: systemColors.indigo[200] }} />

        <Typography variant="body1" sx={{ color: systemColors.indigo[700] }}>
          {t("chooseOption", "Escolha uma das opções abaixo para continuar:")}
        </Typography>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 2,
            justifyContent: "center",
          }}
        >
          {options.map((opt) => (
            <Box
              key={opt.route}
              sx={{
                flex: "1 1 250px",
                p: 3,
                borderRadius: 2,
                background: systemColors.indigo[100],
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 2,
                textAlign: "center",
              }}
            >
              {opt.icon}
              <Typography
                variant="h6"
                sx={{ color: systemColors.indigo[800], fontWeight: "bold" }}
              >
                {opt.label}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: systemColors.indigo[600] }}
              >
                {opt.description}
              </Typography>
              <StyledButton
                label={opt.buttonLabel}
                onClick={() => navTo(opt.route)}
                variant="contained"
                sx={{ mt: 1 }}
              />
            </Box>
          ))}
        </Box>
      </StyledCardContainer>
    </Box>
  );
};

export default HomePage;
