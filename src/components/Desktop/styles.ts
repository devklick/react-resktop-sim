import styled from "@emotion/styled";

export const StyledDesktop = styled.div`
  height: 100dvh;
  width: 100dvw;
  display: grid;
  grid-template-rows: 42px auto 84px;
  grid-template-columns: auto;
  grid-template-areas:
    "top-bar"
    "content"
    "bottom-bar";
  gap: 10px;
`;

export const StyledBackground = styled.div<{ backgroundUrl: string }>`
  height: 100%;
  width: 100%;
  position: absolute;
  grid-area: none;
  z-index: -1;
  background-image: url(${(props) => props.backgroundUrl});
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
`;
