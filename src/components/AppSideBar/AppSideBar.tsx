import useSystemSettings from "../../stores/systemSettingsStore";
import { StyledItem, StyledItemContainer, StyledSideBar } from "./styles";

interface SideBarItem {
  title: string;
  onClick: () => void;
  isActive?: boolean;
}

interface AppSideBarProps {
  items: Array<SideBarItem>;
}

function AppSideBar({ items }: AppSideBarProps) {
  const settings = useSystemSettings();
  return (
    <StyledSideBar>
      <StyledItemContainer>
        {items.map((item) => (
          <StyledItem
            onClick={item.onClick}
            key={item.title}
            active={item.isActive ?? false}
            activeColor={settings.accentColor}
          >
            {item.title}
          </StyledItem>
        ))}
      </StyledItemContainer>
    </StyledSideBar>
  );
}

export default AppSideBar;
