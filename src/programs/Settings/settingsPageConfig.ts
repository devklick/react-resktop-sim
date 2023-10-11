import { SystemSettingState } from "../../stores/systemSettingsStore";
import { SettingsPageProps } from "./Settings";

function isHexColorCode(value: string) {
  return !!value.match("^#(?:[0-9a-fA-F]{3}){1,2}$");
}

export function getPages(
  systemsSettings: SystemSettingState
): Record<string, SettingsPageProps> {
  return {
    appearance: {
      name: "Appearance",
      sections: [
        {
          title: "Background",
          description:
            "Provide a URL for a background image that you would like to use",
          currentValue: systemsSettings.background,
          type: "url",
          valueValidation(value) {
            const lower = value.toLowerCase();
            const allowedTypes = [".jpg", ".jpeg", ".png", ".svg"];
            if (!allowedTypes.some((type) => lower.endsWith(type))) {
              return "Invalid image URL";
            }
          },
          onValueChanged(value) {
            systemsSettings.setBackground(value);
          },
        },
        {
          title: "Main Color",
          description: "The main color for the desktop UI",
          currentValue: systemsSettings.mainColor,
          type: "color",
          valueValidation: (value) =>
            isHexColorCode(value) ? undefined : "Invalid HEX color code",
          onValueChanged(value) {
            systemsSettings.setMainColor(value);
          },
        },
        {
          title: "Accent Color",
          description:
            "The accent for the desktop UI, for things such as currently-selected items (not yet supported)",
          currentValue: systemsSettings.accentColor,
          type: "color",
          valueValidation: (value) =>
            isHexColorCode(value) ? undefined : "Invalid HEX color code",
          onValueChanged(value) {
            systemsSettings.setAccentColor(value);
          },
        },
        {
          title: "Font Color",
          description: "The color to display the main UI font in",
          currentValue: systemsSettings.fontColor,
          type: "color",
          valueValidation: (value) =>
            isHexColorCode(value) ? undefined : "Invalid HEX color code",
          onValueChanged(value) {
            systemsSettings.setFontColor(value);
          },
        },
        {
          title: "Icon Color",
          description: `The color to display any basic icons in. This will affect icons which 
            are essentially just outlines, however more complex icons such as launcher 
            icons will remain unaffected (not yet supported)`,
          currentValue: systemsSettings.iconColor,
          type: "color",
          valueValidation: (value) =>
            isHexColorCode(value) ? undefined : "Invalid HEX color code",
          onValueChanged(value) {
            systemsSettings.setIconColor(value);
          },
        },
      ],
    },
  };
}
