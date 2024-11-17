import { v4 as uuid } from "uuid";

import { useRef, useState } from "react";
import {
  StyledContents,
  StyledWebBrowser,
  StyledWebBrowserHeaderSection,
} from "./styles";
import TabBar, { TabDefinition } from "./TabBar";
import useSystemSettings from "../../stores/systemSettingsStore";
import WebNavBar from "./WebNavBar";
import { isValidUrl } from "../../common/utils/stringUtils";

interface WebBrowserProps {}

type TabWithUrl = TabDefinition & { url: string };

const defaultTab = Object.freeze({
  title: "Google",
  active: true,
  url: "https://www.google.com/search?igu=1",
  id: uuid(),
});

// eslint-disable-next-line no-empty-pattern
function WebBrowser({}: WebBrowserProps) {
  const settings = useSystemSettings();

  const [tabs, setTabs] = useState<Array<TabWithUrl>>([
    { ...defaultTab },
    {
      title: "Other",
      active: false,
      url: "https://lifehacker.com",
      id: uuid(),
    },
  ]);

  function handleCreateTab() {
    const newTabs = [...tabs];
    newTabs.forEach((t) => (t.active = false));
    newTabs.push({ ...defaultTab, id: uuid(), active: true });
    setTabs(newTabs);
  }

  function handleSetActiveTab(id: string, tab?: TabWithUrl) {
    console.log(tabs);
    const newTabs = tabs.map((oldTab) => {
      const newTab = { ...(tab && id === oldTab.id ? tab : oldTab) };
      const active = oldTab.id === id;

      newTab.active = active;
      return newTab;
    });
    console.log(newTabs);
    setTabs(newTabs);
  }

  function handleCloseTab(id: string) {
    console.log("Closing tab BEFORE", id, tabs);
    const newTabs = [...tabs];
    const tabForClose = newTabs.find((t) => t.id === id);
    if (!tabForClose) return;
    const tabForCloseIndex = newTabs.indexOf(tabForClose);

    // If closing the active tab, we need to know which one should now be active.
    // We'll default to the next tab (right), if it exists.
    // However we may be closing the right-most tab, in which case we'll
    // default to the previous (left) tab.
    // However, we may be closing the only tab.
    if (tabForClose.active) {
      const nextActiveTab =
        newTabs[tabForCloseIndex + 1] ?? newTabs[tabForCloseIndex - 1];
      if (nextActiveTab) {
        nextActiveTab.active = true;
      }
    }

    newTabs.splice(tabForCloseIndex, 1);

    // If there are no tabs, add a default one back in.
    // We could close the browser, which would probably make more sense.
    // However we dont currently have access to the bordered app controls
    if (!newTabs.length) {
      newTabs.push(defaultTab);
    }

    console.log("Closing tab AFTER", id, newTabs);
    setTabs(newTabs);
  }

  function getActiveTab() {
    const tab = tabs.find((t) => t.active);
    if (!tab) {
      throw new Error("No active tab found");
    }
    return tab;
  }

  function setActiveTabUrl(url: string) {
    const activeTab = getActiveTab();
    if (isValidUrl(url)) {
      activeTab.url = url;
    } else {
      activeTab.url = googleSearchUrl(url);
    }
    handleSetActiveTab(activeTab.id, activeTab);
  }

  function googleSearchUrl(searchString: string) {
    return `${defaultTab.url}&q=${searchString}`;
  }

  return (
    <StyledWebBrowser
      className="web-browser"
      backgroundColor={settings.mainColor}
    >
      <StyledWebBrowserHeaderSection>
        <TabBar
          tabs={tabs}
          createTab={handleCreateTab}
          setActiveTab={handleSetActiveTab}
          closeTab={handleCloseTab}
        />
        <WebNavBar
          url={getActiveTab().url}
          goBack={() => null}
          goForward={() => null}
          goToUrl={setActiveTabUrl}
        />
      </StyledWebBrowserHeaderSection>
      <StyledContents src={getActiveTab().url} />
    </StyledWebBrowser>
  );
}

export default WebBrowser;
