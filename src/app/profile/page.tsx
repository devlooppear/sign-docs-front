"use client";

import { Box, Typography } from "@mui/material";
import {
  FaUserAlt,
  FaEnvelope,
  FaIdCard,
  FaUserShield,
  FaCalendarAlt,
} from "react-icons/fa";
import systemColors from "@/common/constants/systemColors";
import { useMe } from "@/hooks/useMe/useMe";
import Loader from "@/components/Loader/Loader";
import { cpf, cnpj } from "cpf-cnpj-validator";
import { PersonType } from "@/enum/personType";
import { useTranslation } from "react-i18next";

const ProfilePage = () => {
  const { user, isLoading, isError, error } = useMe();
  const { t } = useTranslation("profile");

  if (isLoading) return <Loader inAll />;

  if (isError || !user) {
    return (
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          mx: "auto",
          mt: 8,
          p: 4,
          borderRadius: 3,
          boxShadow: `0px 6px 20px ${systemColors.indigo[200]}`,
          background: systemColors.indigo[50],
        }}
      >
        <Typography color="error">{t("load_error")}</Typography>
      </Box>
    );
  }

  const documentoFormatado =
    user.person_type === PersonType.PF
      ? cpf.format(user.document_number)
      : cnpj.format(user.document_number);

  const infoRows = [
    { icon: <FaUserAlt />, label: t("name"), value: user.name },
    { icon: <FaEnvelope />, label: t("email"), value: user.email },
    { icon: <FaUserShield />, label: t("role"), value: user.role },
    { icon: <FaIdCard />, label: t("person_type"), value: user.person_type },
    { icon: <FaIdCard />, label: t("document_number"), value: documentoFormatado },
    {
      icon: <FaCalendarAlt />,
      label: t("created_at"),
      value: new Date(user.created_at).toLocaleString(),
    },
  ];

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: 500,
        mx: "auto",
        mt: 8,
        p: 4,
        borderRadius: 3,
        boxShadow: `0px 6px 20px ${systemColors.indigo[200]}`,
        background: systemColors.indigo[50],
      }}
    >
      <Typography variant="h4" color={systemColors.indigo[800]} gutterBottom>
        {t("title")}
      </Typography>

      <Box
        component="ul"
        sx={{
          listStyle: "none",
          p: 0,
          m: 0,
        }}
      >
        {infoRows.map((row, idx) => (
          <Box
            component="li"
            key={idx}
            sx={{
              display: "flex",
              alignItems: "center",
              gap: 2,
              py: 2,
              borderBottom:
                idx < infoRows.length - 1
                  ? `1px solid ${systemColors.indigo[100]}`
                  : "none",
            }}
          >
            <Box sx={{ color: systemColors.indigo[700], minWidth: 28 }}>
              {row.icon}
            </Box>
            <Box>
              <Typography
                variant="body2"
                color={systemColors.gray[800]}
                sx={{ fontWeight: 500 }}
              >
                {row.label}
              </Typography>
              <Typography variant="body1" color={systemColors.gray[900]}>
                {row.value}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default ProfilePage;
