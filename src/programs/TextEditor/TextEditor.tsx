import useSystemSettings from "../../stores/systemSettingsStore";
import { StyledTextArea, StyledTextEditor } from "./styles";

interface TextEditorProps {}

// eslint-disable-next-line no-empty-pattern
function TextEditor({}: TextEditorProps) {
  const settings = useSystemSettings();
  return (
    <StyledTextEditor>
      <StyledTextArea selectedColor={settings.accentColor} />
    </StyledTextEditor>
  );
}

export default TextEditor;
