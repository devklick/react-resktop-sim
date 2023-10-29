import useSystemSettings from "../../../stores/systemSettingsStore";
import { StyledNewTabButton, StyledTab, StyledTabBar } from "./styles";

export type TabDefinition = Omit<TabProps, "onClick">;

interface TabBarProps {
  tabs: Array<TabDefinition>;
  createTab: () => void;
  setActiveTab: (id: string) => void;
}

function TabBar({ tabs, createTab, setActiveTab }: TabBarProps) {
  const settings = useSystemSettings();
  return (
    <StyledTabBar backgroundColor={settings.mainColor}>
      {tabs.map((t) => (
        <Tab
          id={t.id}
          title={t.title}
          active={t.active}
          onClick={() => setActiveTab(t.id)}
        />
      ))}
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
}
function Tab({ id, title, active, onClick }: TabProps) {
  const settings = useSystemSettings();
  return (
    <StyledTab
      active={active}
      backgroundColor={active ? settings.accentColor : settings.mainColor}
      onClick={onClick}
    >
      <span>{title}</span>
    </StyledTab>
  );
}

export default TabBar;
