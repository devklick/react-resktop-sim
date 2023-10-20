import useSystemSettings from "../../stores/systemSettingsStore";

import { StyledHeaderBar } from "./styles";

interface HeaderBarProps {
  header: string;
  position?: "left" | "centre" | "right";
  padVertical?: number;
  padHorizontal?: number;
  borderRadiusTop?: number;
  borderRadiusBottom?: number;
}

function HeaderBar({
  header,
  position = "centre",
  padVertical = 10,
  padHorizontal = 10,
  borderRadiusTop = 10,
  borderRadiusBottom = 10,
}: HeaderBarProps) {
  const settings = useSystemSettings();

  return (
    <StyledHeaderBar
      backgroundColor={settings.mainColor}
      position={position}
      padVertical={padVertical}
      padHorizontal={padHorizontal}
      borderRadiusTop={borderRadiusTop}
      borderRadiusBottom={borderRadiusBottom}
    >
      <span className="header-bar__header">{header}</span>
    </StyledHeaderBar>
  );
}

export default HeaderBar;
