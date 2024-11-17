import React, { useEffect, useState } from "react";
import { StyledNavButton, StyledUrlBar, StyledUrlInput } from "./styles";
import useSystemSettings from "../../../stores/systemSettingsStore";

interface WebNavBarProps {
  url: string;
  goBack: () => void;
  goForward: () => void;
  goToUrl: (url: string) => void;
}

function WebNavBar({ goBack, goForward, goToUrl, url }: WebNavBarProps) {
  const settings = useSystemSettings();
  const [currentUrl, setCurrentUrl] = useState(url);

  useEffect(() => {
    setCurrentUrl(url);
  }, [url]);

  function handleUrlInputKeyDown(e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.code === "Enter") {
      goToUrl(currentUrl);
    }
    if (e.code === "Escape") {
      setCurrentUrl(url);
    }
  }

  return (
    <StyledUrlBar
      backgroundColor={settings.mainColor}
      fontColor={settings.fontColor}
    >
      <StyledNavButton onClick={goBack}>{"<"}</StyledNavButton>
      <StyledNavButton onClick={goForward}>{">"}</StyledNavButton>
      <StyledUrlInput
        type="input"
        value={currentUrl}
        onChange={(e) => setCurrentUrl(e.target.value ?? url)}
        onKeyDown={handleUrlInputKeyDown}
      ></StyledUrlInput>
    </StyledUrlBar>
  );
}

export default WebNavBar;
