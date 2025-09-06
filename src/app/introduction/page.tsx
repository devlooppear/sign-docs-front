"use client";

import React from "react";
import { Typography, Divider, Card, CardContent, Box } from "@mui/material";
import StyledCardContainer from "@/components/StyledCardContainer/StyledCardContainer";
import systemColors from "@/common/constants/systemColors";
import { useNavTo } from "@/hooks/useNavTo/useNavTo";
import { Routes } from "@/common/constants/routes";
import StyledButton from "@/components/StyledButton/StyledButton";
import { useTranslation } from "react-i18next";

const IntroductionPage = () => {
  const { navTo } = useNavTo();

  const { t } = useTranslation("introduction");

  return (
    <StyledCardContainer>

      <Typography
        variant="h4"
        gutterBottom
        sx={{ color: systemColors.indigo[700], fontWeight: "bold" }}
      >
        {t("welcome")}
      </Typography>


      <Typography
        variant="subtitle1"
        gutterBottom
        sx={{ color: systemColors.gray[700], maxWidth: 800 }}
        dangerouslySetInnerHTML={{ __html: t("subtitle") }}
      />

      <Divider
        sx={{
          my: 3,
          borderColor: systemColors.indigo[300],
          width: "100%",
        }}
      />

      <Box
        display="flex"
        flexWrap="wrap"
        gap={3}
        justifyContent="center"
        mb={4}
      >

        {[
          {
            title: t("simplicity_title"),
            desc: t("simplicity_desc"),
          },
          {
            title: t("security_title"),
            desc: t("security_desc"),
          },
          {
            title: t("productivity_title"),
            desc: t("productivity_desc"),
          },
        ].map(({ title, desc }, i) => (
          <Card
            key={i}
            sx={{
              flex: "1 1 280px",
              maxWidth: 340,
              bgcolor: systemColors.indigo[50],
              boxShadow: `0 4px 12px ${systemColors.indigo[200]}`,
              borderRadius: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
            }}
          >
            <CardContent>
              <Typography
                variant="h6"
                sx={{
                  color: systemColors.indigo[700],
                  fontWeight: "bold",
                  mb: 1,
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="body2"
                sx={{ color: systemColors.gray[700] }}
              >
                {desc}
              </Typography>
            </CardContent>
          </Card>
        ))}

        <Card
          sx={{
            flex: "1 1 280px",
            maxWidth: 340,
            bgcolor: systemColors.indigo[50],
            boxShadow: `0 6px 16px ${systemColors.indigo[300]}`,
            borderRadius: 2,
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            p: 2,
          }}
        >
          <CardContent sx={{ textAlign: "center" }}>
            <Typography
              variant="h6"
              sx={{
                color: systemColors.indigo[800],
                fontWeight: "bold",
                mb: 1,
              }}
            >
              {t("get_started_title")}
            </Typography>
            <Typography
              variant="body2"
              sx={{
                color: systemColors.gray[700],
                mb: 3,
              }}
            >
              {t("get_started_desc")}
            </Typography>

            <Box display="flex" gap={2} justifyContent="center" flexWrap="wrap">
              <StyledButton
                label={t("register")}
                variant="contained"
                onClick={() => navTo(Routes.REGISTER)}
              />
              <StyledButton
                label={t("login")}
                variant="outlined"
                onClick={() => navTo(Routes.LOGIN)}
              />
            </Box>
          </CardContent>
        </Card>
      </Box>
    </StyledCardContainer>
  );
};

export default IntroductionPage;
