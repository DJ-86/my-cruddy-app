"use client";
import Editor from "@monaco-editor/react";

type MonacoEditorProps = {
  value: string;
  onChange: (value: string) => void;
};

const MonacoEditor: React.FC<MonacoEditorProps> = ({ value, onChange }) => {
  return (
    <Editor
      height="200px"
      width="50%"
      theme="vs-dark"
      defaultLanguage="javascript"
      defaultValue={value}
      onChange={(newValue) => onChange(newValue || "")} // Ensure no null value
    />
  );
};

export default MonacoEditor;
