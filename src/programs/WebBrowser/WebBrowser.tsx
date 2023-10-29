import { v4 as uuid } from "uuid";

import { useState } from "react";
import { StyledContents, StyledWebBrowser } from "./styles";
import TabBar, { TabDefinition } from "./TabBar";
import useSystemSettings from "../../stores/systemSettingsStore";

interface WebBrowserProps {}

type TabWithUrl = TabDefinition & { url: string };

const defaultTab = {
  title: "Google",
  active: true,
  url: "https://www.google.com/search?igu=1",
  id: uuid(),
};

// eslint-disable-next-line no-empty-pattern
function WebBrowser({}: WebBrowserProps) {
  const settings = useSystemSettings();
  const [tabs, setTabs] = useState<Array<TabWithUrl>>([
    defaultTab,
    {
      title: "Other",
      active: false,
      url: "https://lifehacker.com",
      id: uuid(),
    },
  ]);

  const activeTab = tabs.find((t) => t.active);

  function handleCreateTab() {
    const newTabs = [...tabs];
    newTabs.forEach((t) => (t.active = false));
    newTabs.push({ ...defaultTab, id: uuid(), active: true });
    setTabs(newTabs);
  }

  function handleSetActiveTab(id: string) {
    const newTabs = [...tabs];
    newTabs.forEach((t) => (t.active = t.id === id ? true : false));
    setTabs(newTabs);
  }

  return (
    <StyledWebBrowser backgroundColor={settings.mainColor}>
      <TabBar
        tabs={tabs}
        createTab={handleCreateTab}
        setActiveTab={handleSetActiveTab}
      />
      <StyledContents src={activeTab!.url} />
    </StyledWebBrowser>
  );
}

export default WebBrowser;
