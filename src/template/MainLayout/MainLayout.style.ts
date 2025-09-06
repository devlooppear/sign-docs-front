import styled from "@emotion/styled";
import { Container, Box } from "@mui/material";
import systemColors from "@/common/constants/systemColors";

export const Wrapper = styled(Box)`
  display: flex;
  flex-direction: column;
  min-height: 100vh;

  background: linear-gradient(
    135deg,
    ${systemColors.blue[50]} 10%,
    ${systemColors.indigo[100]} 30%,
    ${systemColors.blue[200]} 100%
  );
  background-color: ${systemColors.gray[50]};
`;

export const StyledContainer = styled(Container)`
  margin-top: 32px;
  margin-bottom: 48px;
  min-height: 80vh;
`;
