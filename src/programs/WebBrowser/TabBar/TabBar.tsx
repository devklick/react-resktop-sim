import React from "react";
import useSystemSettings from "../../../stores/systemSettingsStore";
import {
  StyledNewTabButton,
  StyledTab,
  StyledTabBar,
  StyledTabBarTabs,
  StyledTabCloseButton,
} from "./styles";

export type TabDefinition = Omit<TabProps, "onClick" | "onClose">;

interface TabBarProps {
  tabs: Array<TabDefinition>;
  createTab: () => void;
  setActiveTab: (id: string) => void;
  closeTab: (id: string) => void;
}

function TabBar({ tabs, createTab, setActiveTab, closeTab }: TabBarProps) {
  const settings = useSystemSettings();
  return (
    <StyledTabBar>
      <StyledTabBarTabs
        className="tab-bar"
        backgroundColor={settings.mainColor}
      >
        {tabs.map((t) => (
          <Tab
            id={t.id}
            title={t.title}
            active={t.active}
            onClick={() => setActiveTab(t.id)}
            onClose={() => closeTab(t.id)}
          />
        ))}
      </StyledTabBarTabs>
      <StyledNewTabButton onClick={createTab}>
        <span>+</span>
      </StyledNewTabButton>
    </StyledTabBar>
  );
}

interface TabProps {
  title: string;
  id: string;
  active: boolean;
  onClick: () => void;
  onClose: () => void;
}
function Tab({ id, title, active, onClick, onClose }: TabProps) {
  const settings = useSystemSettings();

  function handleCloseClicked(e: React.MouseEvent<HTMLButtonElement>) {
    e.stopPropagation();
    onClose();
  }
  return (
    <StyledTab
      active={active}
      backgroundColor={active ? settings.accentColor : settings.mainColor}
      onClick={onClick}
      key={id}
    >
      <span>{title}</span>
      <StyledTabCloseButton onClick={handleCloseClicked}>
        x
      </StyledTabCloseButton>
    </StyledTab>
  );
}

export default TabBar;
