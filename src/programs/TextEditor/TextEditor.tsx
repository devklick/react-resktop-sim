import { StyledTextArea, StyledTextEditor } from "./styles";

interface TextEditorProps {}

// eslint-disable-next-line no-empty-pattern
function TextEditor({}: TextEditorProps) {
  return (
    <StyledTextEditor>
      <StyledTextArea />
    </StyledTextEditor>
  );
}

export default TextEditor;
