"use client";

import React from "react";
import { Select, MenuItem, Box, Typography } from "@mui/material";
import { LANGUAGE_OPTIONS, Languages } from "@/enum/language";
import { getAppLanguage, setAppLanguage } from "@/common/utils/language";

export default function LanguageSwitcher() {
  const [language, setLanguage] = React.useState<Languages>(getAppLanguage());

  const handleChange = (event: any) => {
    const newLang = event.target.value as Languages;
    setLanguage(newLang);
    setAppLanguage(newLang);
  };

  return (
    <Select
      value={language}
      onChange={handleChange}
      variant="outlined"
      size="small"
      sx={{
        minWidth: 140,
        fontSize: "0.9rem",
        backgroundColor: "white",
        borderRadius: 2,
      }}
    >
      {LANGUAGE_OPTIONS.map((option) => (
        <MenuItem key={option.code} value={option.code}>
          <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
            <Typography component="span" sx={{ fontSize: "1.2rem" }}>
              {option.flag}
            </Typography>
            <Typography component="span">{option.label}</Typography>
          </Box>
        </MenuItem>
      ))}
    </Select>
  );
}
