"use client";

import React from "react";
import { Box, Typography, Button } from "@mui/material";
import systemColors from "@/common/constants/systemColors";
import { useTranslation } from "react-i18next";

interface DoneProps {
  signedUrl: string;
  onRestart: () => void;
}

export const Done: React.FC<DoneProps> = ({ signedUrl, onRestart }) => {
  const { t } = useTranslation("to-sign");

  return (
    <Box sx={{ textAlign: "center", py: 4 }}>
      <Typography variant="h6" color={systemColors.success} sx={{ mb: 2 }}>
        {t("done_title")}
      </Typography>

      <Typography variant="body1" color="text.secondary" sx={{ mb: 3 }}>
        {t("done_description")}
      </Typography>

      <Box
        sx={{
          width: "100%",
          height: "600px",
          border: `1px solid ${systemColors.indigo[200]}`,
          borderRadius: 2,
          overflow: "hidden",
          mb: 3,
        }}
      >
        <iframe
          src={signedUrl}
          title={t("done_iframe_title")}
          width="100%"
          height="100%"
          style={{ border: "none" }}
        />
      </Box>

      <Button
        variant="contained"
        color="primary"
        component="a"
        href={signedUrl}
        target="_blank"
        rel="noopener noreferrer"
        sx={{ mr: 2 }}
      >
        {t("done_button_fullscreen")}
      </Button>

      <Button variant="outlined" color="secondary" onClick={onRestart}>
        {t("done_button_restart")}
      </Button>
    </Box>
  );
};
