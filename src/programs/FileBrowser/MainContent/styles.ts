import styled from "@emotion/styled";

export const StyledMainContent = styled.div`
  grid-area: main-content;
  padding: 20px;
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  display: grid;
  gap: 20px;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  grid-template-rows: min-content;
  box-sizing: border-box;
`;
