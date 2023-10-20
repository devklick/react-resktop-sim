export const KeyCodes = {
  Escape: "Escape",
  Enter: "Enter",
  NumpadEnter: "NumpadEnter",
} as const;

export const allKeyCodes = Object.values(KeyCodes);

export type KeyCode = (typeof KeyCodes)[keyof typeof KeyCodes];

export function isKeyCode(value: unknown): value is KeyCode {
  return (
    typeof value === "string" && Object.values<string>(KeyCodes).includes(value)
  );
}
