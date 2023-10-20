import styled from "@emotion/styled";

import { ReactComponent as PowerIcon } from "../../../../assets/icons/power-icon.svg";

export const StyledPowerMenu = styled.div`
  height: 100%;
  width: fit-content;
  padding: 3px;
  box-sizing: border-box;
  display: flex;
  justify-content: flex-end;
  align-items: center;
`;

export const StyledPowerIcon = styled(PowerIcon)`
  height: 20px;
  aspect-ratio: 1/1;
  width: auto;
  path {
    fill: white;
  }
`;
