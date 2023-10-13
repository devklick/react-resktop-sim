import React, { useEffect, useRef, useState } from "react";
import "./FullAppPrompt.scss";
import { Rect } from "../../hooks/useDragToResize";
import useDetectMouseDownOutside from "../../hooks/useDetectMouseDownOutside";
import useSystemSettings from "../../stores/systemSettingsStore";

interface FullAppPromptProps<Element extends HTMLElement> {
  appRef: React.RefObject<Element>;
  promptName: string;
  fieldName: string;
  close: () => void;
  submit: (value: string) => void;
  validate: (value: string) => string | null;
}

function FullAppPrompt<Element extends HTMLElement>({
  appRef,
  fieldName,
  promptName,
  close,
  submit,
  validate,
}: FullAppPromptProps<Element>) {
  const thisRef = useRef<HTMLDivElement>(null);
  const settings = useSystemSettings();
  const value = useRef<string>("");
  const [error, setError] = useState<string | null>(validate(""));
  const [rect, setRect] = useState<Rect>({
    height: 0,
    left: 0,
    top: 0,
    width: 0,
  });

  useDetectMouseDownOutside({ elementRef: thisRef, onMouseDown: close });

  useEffect(() => {
    if (appRef.current) {
      const bounds = appRef.current.getBoundingClientRect();
      setRect({
        height: bounds.height ?? 0,
        left: bounds.left ?? 0,
        top: bounds.top ?? 0,
        width: bounds.width ?? 0,
      });
    }
  }, [appRef]);

  function handleCancel() {
    close();
  }

  function handleSubmit() {
    if (error) return;
    submit(value.current);
    close();
  }

  function handleValueChange(e: React.ChangeEvent<HTMLInputElement>) {
    value.current = e.currentTarget.value;
    setError(validate(value.current));
  }

  function handleContextMenu(e: React.MouseEvent) {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div
      className="full-app-prompt"
      ref={thisRef}
      style={{ ...rect }}
      onContextMenu={handleContextMenu}
    >
      <div
        className="full-app-prompt-content"
        style={{ backgroundColor: settings.mainColor }}
      >
        <div className="full-app-prompt-content__top-box">
          <button
            className="full-app-prompt-content__top-box__cancel"
            onClick={handleCancel}
          >
            Cancel
          </button>
          <span className="full-app-prompt-content__top-box__title">
            {promptName}
          </span>
          <button
            className="full-app-prompt-content__top-box__submit"
            onClick={handleSubmit}
            disabled={!!error}
          >
            Submit
          </button>
        </div>

        <div className="full-app-prompt-content__input-area">
          <span className="full-app-prompt-content__input-area__name">
            {`${fieldName}:`}
          </span>
          <input
            autoFocus
            className="full-app-prompt-content__input-area__value"
            onChange={handleValueChange}
          ></input>
          <span>{error}</span>
        </div>
      </div>
    </div>
  );
}

export default FullAppPrompt;
