import {
  StyledContents,
  StyledWebBrowser,
  StyledWebBrowserHeaderSection,
} from "./styles";
import TabBar from "./TabBar";
import useSystemSettings from "../../stores/systemSettingsStore";
import WebNavBar from "./WebNavBar";
import useTabs from "./useTabs";

interface WebBrowserProps {}

// eslint-disable-next-line no-empty-pattern
function WebBrowser({}: WebBrowserProps) {
  const settings = useSystemSettings();
  const [tabs, activeTab, tabFns] = useTabs();
  const currentUrl = activeTab.history[activeTab.historyPosition];
  return (
    <StyledWebBrowser
      className="web-browser"
      backgroundColor={settings.mainColor}
    >
      <StyledWebBrowserHeaderSection>
        <TabBar
          tabs={tabs}
          createTab={tabFns.newTab}
          setActiveTab={tabFns.setActiveTab}
          closeTab={tabFns.closeTab}
        />
        <WebNavBar
          url={currentUrl}
          goBack={tabFns.navBack}
          goForward={tabFns.navForward}
          goToUrl={tabFns.setActiveTabUrl}
        />
      </StyledWebBrowserHeaderSection>
      <StyledContents src={currentUrl} />
    </StyledWebBrowser>
  );
}

export default WebBrowser;
