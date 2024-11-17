import styled from "@emotion/styled";

export const StyledWebBrowser = styled.div<{ backgroundColor: string }>`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 10px;
  box-shadow: 0px 0px 4px rgb(0, 0, 0, 0.5) inset;
  box-sizing: border-box;
  background-color: ${(props) => props.backgroundColor};
`;

export const StyledWebBrowserHeaderSection = styled.div`
  width: 100%;
  padding: 0 4px;
  box-sizing: border-box;
`;

export const StyledContents = styled.iframe`
  width: 100%;
  height: 100%;
  border: none;
  border-bottom-left-radius: 10px;
  border-bottom-right-radius: 10px;
`;
