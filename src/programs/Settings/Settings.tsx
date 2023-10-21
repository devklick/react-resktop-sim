import React, { HTMLInputTypeAttribute, useRef, useState } from "react";

import AppSideBar from "../../components/AppSideBar";
import { getPages } from "./settingsPageConfig";
import useSystemSettings from "../../stores/systemSettingsStore";

import {
  StyledPage,
  StyledSection,
  StyledSectionDescription,
  StyledSectionTitle,
  StyledSectionValue,
  StyledSections,
  StyledSettings,
} from "./styles";
import Button from "../../components/Button";

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
      case "button":
        return "button";
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

  function getInputField() {
    const type = getInputType(section.type);
    if (type === "button")
      return (
        <Button name="Restore" onClick={() => section.onValueChanged("")} />
      );
    return (
      <StyledSectionValue
        type={getInputType(section.type)}
        value={String(value)}
        onChange={handleChange}
      />
    );
  }

  return (
    <StyledSection>
      <StyledSectionTitle>{section.title}</StyledSectionTitle>
      <StyledSectionDescription>{section.description}</StyledSectionDescription>
      {getInputField()}
    </StyledSection>
  );
}

export interface SettingsPageProps {
  name: string;
  sections: Array<SettingsSectionProps>;
}

function SettingsPage({ sections }: SettingsPageProps) {
  return (
    <StyledPage>
      <StyledSections>
        {sections.map((section) => (
          <SettingsSection {...section} key={section.title} />
        ))}
      </StyledSections>
    </StyledPage>
  );
}

interface SettingsProps {}

// eslint-disable-next-line no-empty-pattern
function Settings({}: SettingsProps) {
  const systemSettings = useSystemSettings();
  const pages = getPages(systemSettings);
  const [currentPage, setCurrentPage] = useState<string>(Object.keys(pages)[0]);

  function getItems(): Parameters<typeof AppSideBar>[0]["items"] {
    return Object.entries<SettingsPageProps>(pages).map(([type, page]) => ({
      title: page.name,
      isActive: currentPage === type,
      onClick: () => setCurrentPage(type),
    }));
  }

  return (
    <StyledSettings>
      <AppSideBar items={getItems()} />
      <SettingsPage {...pages[currentPage]} />
    </StyledSettings>
  );
}

export default Settings;
