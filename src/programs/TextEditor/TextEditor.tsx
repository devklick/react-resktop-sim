import "./TextEditor.scss";

interface TextEditorProps {}

// eslint-disable-next-line no-empty-pattern
function TextEditor({}: TextEditorProps) {
  return (
    <div className="text-editor">
      <textarea className="text-editor__text-area" />
    </div>
  );
}

export default TextEditor;
