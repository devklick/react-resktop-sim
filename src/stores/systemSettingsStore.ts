import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SystemSettingState {
  mainColor: string;
  accentColor: string;
  fontColor: string;
  iconColor: string;
  background: string;
  setMainColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  setFontColor: (color: string) => void;
  setIconColor: (color: string) => void;
  setBackground: (url: string) => void;
}

export const useSystemSettings = create<SystemSettingState>()(
  persist(
    (set) => ({
      mainColor: "#2e3440",
      accentColor: "#454e60",
      fontColor: "#ffffff",
      iconColor: "#9298b9",
      background: "https://regolith-linux.org/images/releases/nord-dark.png",
      setAccentColor(accentColor) {
        set({ accentColor });
      },
      setMainColor(mainColor) {
        set({ mainColor });
      },
      setFontColor(fontColor) {
        set({ fontColor });
      },
      setIconColor(iconColor) {
        set({ iconColor });
      },
      setBackground(background) {
        set({ background });
      },
    }),
    {
      name: "system-settings",
    }
  )
);

export default useSystemSettings;
