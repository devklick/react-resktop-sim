import AppSideBar from "../../components/AppSideBar";
import { getPages } from "./settingsPageConfig";

import "./Settings.scss";
import React, { HTMLInputTypeAttribute, useRef, useState } from "react";
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
  // We'll keep the section value in local state for a short time
  // before updating global state with it. This will allow values which
  // are actively being input and at the time are technically "invalid"
  // to still be shown on the screen
  const updateStateDelay = useRef<NodeJS.Timeout | null>(null);
  const [value, setValue] = useState(section.currentValue);
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
  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    setValue(event.currentTarget.value);
    updateStateDelay.current && clearTimeout(updateStateDelay.current);
    updateStateDelay.current = setTimeout(() => {
      const newValue = event.target.value;
      if (section.validValues && !section.validValues.includes(newValue)) {
        console.error("Not an allowed value");
        return;
      }

      if (section.valueValidation) {
        const error = section.valueValidation(newValue);
        if (error) {
          console.error("Not a valid value", newValue);
          return;
        }
      }
      section.onValueChanged(newValue);
    }, 1000);
  }

  return (
    <div className="settings__page-section">
      <h1 className="settings__page-section__title">{section.title}</h1>
      <p className="settings__page-section__description">
        {section.description}
      </p>
      <input
        className="settings__page-section__value"
        type={getInputType(section.type)}
        value={String(value)}
        onChange={handleChange}
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
