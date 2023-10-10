import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface SystemSettingState {
  mainColor: string;
  accentColor: string;
  background: string;
  setMainColor: (color: string) => void;
  setAccentColor: (color: string) => void;
  setBackground: (url: string) => void;
}

export const useSystemSettings = create<SystemSettingState>()(
  persist(
    (set) => ({
      mainColor: "#2e3440",
      accentColor: "#ffffff",
      background: "https://regolith-linux.org/images/releases/nord-dark.png",
      setAccentColor(accentColor) {
        set({ accentColor });
      },
      setMainColor(mainColor) {
        set({ mainColor });
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
