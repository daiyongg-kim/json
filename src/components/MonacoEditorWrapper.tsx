import React from 'react';
import Editor, { EditorProps } from '@monaco-editor/react';

interface MonacoEditorWrapperProps {
  value: string;
  onChange: (value: string | undefined) => void;
  language: string;
  theme?: string;
}

const MonacoEditorWrapper: React.FC<MonacoEditorWrapperProps> = ({ 
  value, 
  onChange, 
  language, 
  theme = 'vs-dark' 
}) => {
  return (
    <Editor
      height="100%"
      language={language}
      value={value}
      theme={theme}
      onChange={onChange}
      options={{
        minimap: { enabled: false },
        fontSize: 14,
        wordWrap: 'on',
        scrollBeyondLastLine: false,
        automaticLayout: true,
        tabSize: 2,
        formatOnPaste: true,
        formatOnType: true,
      }}
    />
  );
};

export default MonacoEditorWrapper;