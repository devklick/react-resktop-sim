import { useState } from "react";
import { v4 as uuid } from "uuid";
import { isValidUrl } from "../../common/utils/stringUtils";

export type TabInfo = {
  /**
   * A global unique ID for the tab.
   */
  id: Readonly<string>;
  /**
   * The text that should be displayed on the tab.
   * This could also be considered the tab name.
   */
  title: string;
  /**
   * The tab number on relation to the other tabs.
   * Every new tab will be assigned the next number in the sequence.
   * If a tab is deleted, the tabs following it will have their number decreased.
   */
  number: number;
  /**
   * Whether or not this tab is currently active.
   */
  active: boolean;
  /**
   * The position (index) within this tabs history that the tab is currently using.
   * All tabs will start off with one history item (google) and the history position will be 0.
   */
  historyPosition: number;
  /**
   * The history of URL's this tab has browsed to.
   * It will default to an array with a single item in it; google.
   */
  history: Array<string>;
};

const defaultTab: Readonly<TabInfo> = {
  title: "Google",
  active: true,
  id: uuid(),
  number: 0,
  history: ["https://www.google.com/search?igu=1"],
  historyPosition: 0,
};

function useTabs() {
  const [tabs, setTabs] = useState<ReadonlyArray<TabInfo>>([{ ...defaultTab }]);

  function newTab() {
    const newTabs = [...tabs];
    newTabs.forEach((t) => (t.active = false));
    newTabs.push({ ...defaultTab, id: uuid(), active: true });
    setTabs(newTabs);
  }

  function setActiveTab(id: string, tab?: TabInfo) {
    const newTabs = tabs.map((oldTab) => {
      const newTab = { ...(tab && id === oldTab.id ? tab : oldTab) };
      const active = oldTab.id === id;

      newTab.active = active;
      return newTab;
    });
    setTabs(newTabs);
  }

  function closeTab(id: string) {
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
      activeTab.history.push(url);
    } else {
      activeTab.history.push(googleSearchUrl(url));
    }

    activeTab.historyPosition += 1;
    setActiveTab(activeTab.id, activeTab);
  }

  function googleSearchUrl(searchString: string) {
    return `${defaultTab.history[0]}&q=${searchString}`;
  }

  function navForward() {
    const tab = getActiveTab();
    if (tab.history.length - 1 > tab.historyPosition) {
      tab.historyPosition += 1;
      setActiveTab(tab.id, tab);
    }
  }

  function navBack() {
    const tab = getActiveTab();
    if (tab.history.length && tab.historyPosition) {
      tab.historyPosition -= 1;
      setActiveTab(tab.id, tab);
    }
  }

  return [
    tabs,
    getActiveTab(),
    {
      newTab,
      closeTab,
      setActiveTabUrl,
      setActiveTab,
      navForward,
      navBack,
    },
  ] as const;
}

export default useTabs;
