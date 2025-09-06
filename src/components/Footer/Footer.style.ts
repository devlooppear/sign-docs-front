"use client";

import styled from "@emotion/styled";
import { Box, Typography, Divider } from "@mui/material";
import systemColors from "@/common/constants/systemColors";

export const FooterContainer = styled(Box)`
  background: linear-gradient(
    180deg,
    ${systemColors.indigo[700]} 0%,
    ${systemColors.indigo[800]} 100%
  );
  color: ${systemColors.gray[100]};
  padding: 48px 24px 24px;
`;

export const FooterWrapper = styled(Box)`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  gap: 32px;
  margin-bottom: 32px;
`;

export const FooterSection = styled(Box)`
  flex: 1 1 250px;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

export const FooterDivider = styled(Divider)`
  background-color: ${systemColors.gray[100]};
  opacity: 0.2;
  margin: 16px 0;
`;

export const FooterCopy = styled(Typography)`
  text-align: center;
  opacity: 0.8;
`;
