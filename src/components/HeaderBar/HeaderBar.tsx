import { CSSProperties } from "react";
import "./HeaderBar.scss";
import useSystemSettings from "../../stores/systemSettingsStore";

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
  function getJustifyContent(): CSSProperties["justifyContent"] {
    switch (position) {
      case "left":
        return "flex-start";
      case "right":
        return "flex-end";
      case "centre":
      default:
        return "center";
    }
  }
  return (
    <div
      className="header-bar__container"
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: getJustifyContent(),
        paddingTop: padVertical,
        paddingBottom: padVertical,
        paddingLeft: padHorizontal,
        paddingRight: padHorizontal,
        backgroundColor: settings.mainColor,
        borderTopLeftRadius: borderRadiusTop,
        borderTopRightRadius: borderRadiusTop,
        borderBottomLeftRadius: borderRadiusBottom,
        borderBottomRightRadius: borderRadiusBottom,
      }}
    >
      <span className="header-bar__header">{header}</span>
    </div>
  );
}

export default HeaderBar;
