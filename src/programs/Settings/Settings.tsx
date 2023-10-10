import AppSideBar from "../../components/AppSideBar";
import { getPages } from "./settingsPageConfig";

import "./Settings.scss";
import { HTMLInputTypeAttribute, useRef, useState } from "react";
import useSystemSettings from "../../stores/systemSettingsStore";

interface SettingsSectionProps {
  title: string;
  description: string;
  type: string;
  currentValue: unknown;
  validValues?: Array<unknown>;
  valueValidation?: (value: string) => string | undefined;
  onValueChanged: (value: string) => void;
}

function SettingsSection(section: SettingsSectionProps) {
  function getInputType(type: string): HTMLInputTypeAttribute {
    switch (type) {
      case "color":
        return "color";
      case "url":
        return "url";
      default:
        return "text";
    }
  }
  return (
    <div className="settings__page-section">
      <h1>{section.title}</h1>
      <p>{section.description}</p>
      <input
        type={getInputType(section.type)}
        value={String(section.currentValue)}
        onChange={(e) => {
          console.log("value changed to", e.currentTarget.value);
          section.onValueChanged(e.currentTarget.value);
        }}
      ></input>
    </div>
  );
}

export interface SettingsPageProps {
  name: string;
  sections: Array<SettingsSectionProps>;
}

function SettingsPage({ sections }: SettingsPageProps) {
  return (
    <div className="settings__page">
      <div className="settings__page-sections">
        {sections.map((section) => (
          <SettingsSection {...section} />
        ))}
      </div>
    </div>
  );
}

interface SettingsProps {}

// eslint-disable-next-line no-empty-pattern
function Settings({}: SettingsProps) {
  const systemSettings = useSystemSettings();
  const pages = getPages(systemSettings);
  const [currentPage, setCurrentPage] = useState<string>(Object.keys(pages)[0]);

  function getAppBar() {
    return (
      <AppSideBar
        items={Object.entries<SettingsPageProps>(pages).map(([type, page]) => {
          return {
            title: page.name,
            isActive: currentPage === type,
            onClick: () => setCurrentPage(type),
          };
        })}
      />
    );
  }

  return (
    <div className="settings">
      {getAppBar()}
      <SettingsPage {...pages[currentPage]} />
    </div>
  );
}

export default Settings;
