import styled from "@emotion/styled";

export const StyledSettings = styled.div`
  display: grid;
  grid-template-columns: 150px auto;
  grid-template-areas: "side-bar main-content";
  width: 100%;
  height: 100%;
  box-shadow: 0px 0px 4px rgb(0, 0, 0, 0.5) inset;
  border-radius: 10px;
`;

export const StyledPage = styled.div`
  overflow: auto;
`;

export const StyledSections = styled.div`
  margin: 20px;
  display: flex;
  flex-direction: column;
  gap: 20px;
  &:last-of-type ~ hr {
    display: none;
  }
`;

export const StyledSection = styled.div``;

export const StyledSectionTitle = styled.h1`
  margin: 0;
  font-size: 18px;
`;

export const StyledSectionDescription = styled.p``;

export const StyledSectionValue = styled.input`
  width: 100%;
`;
